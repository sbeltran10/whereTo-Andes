import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Resultados = new Mongo.Collection('resultados', { idGeneration: 'MONGO' });

Resultados.schema = new SimpleSchema({
    nombre: { type: String },
    ubicacion: { type: String, optional: true },
    imagen: { type: String, optional: true },
    comoLlegar: { type: String, optional: true },
    horario: { type: String, optional: true }
});

// Se encarga de realizar todas las verificaciones usando el esquema definido previamente
Resultados.attachSchema(Resultados.schema);


if (Meteor.isServer) {
    Meteor.publish('resultados', function resultadosPublication() {
        return Resultados.find({}, {
            fields: {
                nombre: 1,
                ubicacion: 1,
                imagen: 1,
                comoLlegar: 1,
                horario: 1
            },
            limit: 15
        });
    });
}


Meteor.methods({
    'resultados.insert'(resultado) {

        // Verificacion de logeo y rol

        if (!Meteor.user() || Meteor.user().profile.role !== 'admin') {
            throw new Meteor.Error('not-authorized');
        }
        return Resultados.insert(resultado);
    },
    'resultados.remove'(resultadoId) {

        if (!Meteor.user() || Meteor.user().profile.role !== 'admin') {
            throw new Meteor.Error('not-authorized');
        }
        if (!resultadoId || Object.keys(resultadoId).length === 0) {
            throw new Meteor.Error('invalid-id', "El id del resultado a eliminar es invalido");
        }
        Resultados.remove(resultadoId);
    },

});