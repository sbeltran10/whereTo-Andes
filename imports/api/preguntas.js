import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Preguntas = new Mongo.Collection('preguntas');

Preguntas.schema = new SimpleSchema({
    contenido: { type: String },
    respuestasHijo: { type: [String], optional: true }
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

        if (!Meteor.user() || Meteor.user().rol !== 'admin') {
            throw new Meteor.Error('not-authorized');
        }
        Tasks.insert(pregunta);
    },
    'preguntas.remove'(taskId) {

         if (!Meteor.user() || Meteor.user().rol !== 'admin') {
            throw new Meteor.Error('not-authorized');
        }
        Tasks.remove(taskId);
    },

});