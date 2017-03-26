import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Preguntas = new Mongo.Collection('preguntas', {idGeneration: 'MONGO'});

Preguntas.schema = new SimpleSchema({
    contenido: { type: String },
    respuestasHijo: { type: [SimpleSchema.RegEx.Id], optional: true }
});

Preguntas.attachSchema(Preguntas.schema);

/*
if (Meteor.isServer) {
  Meteor.publish('preguntas', function preguntasPublication() {
    return preguntas.find();
  });
}
*/

Meteor.methods({
    'preguntas.insert'(pregunta) {

        // Verificacion de logeo y rol

        if (!Meteor.user() || Meteor.user().profile.role!=='admin') {
            throw new Meteor.Error('not-authorized');
        }
        return Preguntas.insert(pregunta);
    },
    'preguntas.insertRespuesta'(idPregunta, idRespuesta) {

        // Verificacion de logeo y rol
        if (!Meteor.user() || Meteor.user().profile.role!=='admin') {
            throw new Meteor.Error('not-authorized');
        }
        return Preguntas.update({_id : idPregunta},{ $push: { respuestasHijo: idRespuesta}});
    },
    'preguntas.remove'(preguntaId) {

         if (!Meteor.user() || Meteor.user().rol !== 'admin') {
            throw new Meteor.Error('not-authorized');
        }
        Preguntas.remove(preguntaId);
    },

});