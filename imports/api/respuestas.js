import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Respuestas = new Mongo.Collection('respuestas', { idGeneration: 'MONGO' });

Respuestas.schema = new SimpleSchema({
    contenido: { type: String },
    simbolo: { type: String, optional: true },
    preguntasHijo: { type: [SimpleSchema.RegEx.Id], optional: true },
    resultadosHijo: { type: [SimpleSchema.RegEx.Id], optional: true }
});

// Se encarga de realizar todas las verificaciones usando el esquema definido previamente
Respuestas.attachSchema(Respuestas.schema);


if (Meteor.isServer) {
    Meteor.publish('respuestas', function respuestasPublication() {
        return Respuestas.find({},{
            fields: {
                contenido: 1,
                simbolo: 1,
                preguntasHijo: 1,
                resultadosHijo: 1
            }
        });
    });
}


Meteor.methods({
    'respuestas.insert'(respuesta) {

        // Verificacion de logeo y rol

        //solo los admin pueden hacer preguntas y dar respuestas?

        if (!Meteor.user() || Meteor.user().profile.role !== 'admin') {
            throw new Meteor.Error('not-authorized');
        }
        return Respuestas.insert(respuesta);
    },
    'respuestas.remove'(respuestaId) {

        if (!Meteor.user() || Meteor.user().profile.role !== 'admin') {
            throw new Meteor.Error('not-authorized');
        }
        if (!respuestaId || Object.keys(respuestaId).length === 0) {
            throw new Meteor.Error('invalid-id', "El id de la respuesta a eliminar es invalido");
        }
        return Respuestas.remove(respuestaId);
    },

});
