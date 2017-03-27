import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Respuestas = new Mongo.Collection('respuestas',{ idGeneration: 'MONGO' });

Respuestas.schema = new SimpleSchema({
    contenido: { type: String},
    simbolo: { type: String, optional:true},
    preguntasHijo:{ type: [SimpleSchema.RegEx.Id], optional:true},
    resultadosHijo: { type: [SimpleSchema.RegEx.Id], optional:true}
});

Respuestas.attachSchema(Respuestas.schema);

/*
if (Meteor.isServer) {
  Meteor.publish('respuestas', function respuestasPublication() {
    return respuestas.find();
  });
}
*/

Meteor.methods({
    'respuestas.insert'(respuesta) {

        // Verificacion de logeo y rol
        if (!Meteor.user() || Meteor.user().profile.role!=='admin') {
            throw new Meteor.Error('not-authorized');
        }
        return Respuestas.insert(respuesta);
    },
    'respuestas.remove'(respuestaId) {
        
         if (!Meteor.user() || Meteor.user().profile.role !== 'admin') {
            throw new Meteor.Error('not-authorized');
        }
        return Respuestas.remove(respuestaId);
    },

});

