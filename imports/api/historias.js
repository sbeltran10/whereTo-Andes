import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Historias = new Mongo.Collection('historias');
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
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Historias.insert(historia);
    },
    'historias.remove'(historiaId) {
        if (!Meteor.user()) {
            throw new Meteor.Error('not-authorized');
        }
        Historias.remove(historiaId);
    },

});
