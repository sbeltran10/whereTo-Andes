import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Respuestas = new Mongo.Collection('respuestas');

Respuestas.schema = new SimpleSchema({
    contenido: { type: String},
    simbolo: { type: String, optional:true},
    preguntaHijo:{ type: String, optional:true},
    resultadoHijo: { type: String, optional:true}
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
        
        if (!Meteor.user() || Meteor.user().rol!=='admin') {
            throw new Meteor.Error('not-authorized');
        }
        Tasks.insert(respuesta);
    },
    'respuestas.remove'(taskId) {
        
         if (!Meteor.user() || Meteor.user().rol !== 'admin') {
            throw new Meteor.Error('not-authorized');
        }
        Tasks.remove(taskId);
    },

});

