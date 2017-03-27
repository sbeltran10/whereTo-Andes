import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Resultados = new Mongo.Collection('resultados', {idGeneration: 'MONGO'});

Resultados.schema = new SimpleSchema({
    nombre: { type: String },
    ubicacion: { type: String, optional: true },
    imagen: { type: String, optional: true },
    comoLlegar: { type: String, optional: true },
    horario: { type: String, optional: true }
});

Resultados.attachSchema(Resultados.schema);

/*
if (Meteor.isServer) {
  Meteor.publish('resultados', function resultadosPublication() {
    return resultados.find();
  });
}
*/

Meteor.methods({
    'resultados.insert'(resultado) {

        // Verificacion de logeo y rol

        if (!Meteor.user() || Meteor.user().profile.role!=='admin') {
            throw new Meteor.Error('not-authorized');
        }
        return Resultados.insert(resultado);
    },
    'resultados.remove'(resultadoId) {

       if (!Meteor.user() || Meteor.user().profile.role!=='admin') {
            throw new Meteor.Error('not-authorized');
        }
        Resultados.remove(resultadoId);
    },

});