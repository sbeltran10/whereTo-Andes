import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Historias = new Mongo.Collection('historias');

Historias.schema = new SimpleSchema({
    nombre: { type: String },
    fecha: { type: Date },
    usuario: { type: String },
    pasos: { type: [Object], optional: true }
});

Historias.attachSchema(Historias.schema);

/*
if (Meteor.isServer) {
  Meteor.publish('resultados', function resultadosPublication() {
    return resultados.find();
  });
}
*/

Meteor.methods({
    'historias.insert'(historia) {

        // Verificacion de logeo y rol
        if (!Meteor.user()) {
            throw new Meteor.Error('not-authorized');
        }
        Tasks.insert(historia);
    },
    'historias.remove'(taskId) {

        if (!Meteor.user()) {
            throw new Meteor.Error('not-authorized');
        }
        Tasks.remove(taskId);
    },

});
