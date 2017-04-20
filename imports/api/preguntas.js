import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
//podrian quitar este check que no estan usando
import { check } from 'meteor/check';

export const Preguntas = new Mongo.Collection('preguntas', { idGeneration: 'MONGO' });

Preguntas.schema = new SimpleSchema({
    contenido: { type: String },
    respuestasHijo: { type: [SimpleSchema.RegEx.Id], optional: true }
});

// Se encarga de realizar todas las verificaciones usando el esquema definido previamente
Preguntas.attachSchema(Preguntas.schema);


if (Meteor.isServer) {
    Meteor.publish('preguntas', function preguntasPublication() {
        return Preguntas.find({},{
            fields: {
                contenido: 1,
                respuestasHijo: 1
            }
        });
    });
}


Meteor.methods({
    'preguntas.insert'(pregunta) {

        // Verificacion de logeo y rol
        //solo los admin pueden hacer preguntas y dar respuestas?
        if (!Meteor.user() || Meteor.user().profile.role !== 'admin') {
            throw new Meteor.Error('not-authorized');
        }
        // Les recomiendo mucho que validen si "pregunta" este bien definido antes de insertar
        // Entiendo que no deberia suceder nada malo pues solo los admin pueden llegar hasta este punto
        // pero tal vez no esta de más
        return Preguntas.insert(pregunta);
    },
    'preguntas.insertRespuesta'(idPregunta, idRespuesta) {

        // Verificacion de logeo y rol
        if (!Meteor.user() || Meteor.user().profile.role !== 'admin') {
            throw new Meteor.Error('not-authorized');
        }
        if (!idPregunta || Object.keys(idPregunta).length === 0) {
            throw new Meteor.Error('invalid-id', "El id de la pregunta a insertar es invalido");
        }
        if (!idRespuesta || Object.keys(idRespuesta).length === 0) {
            throw new Meteor.Error('invalid-id', "El id de la respuesta a insertar es invalido");
        }
        return Preguntas.update({ _id: idPregunta }, { $push: { respuestasHijo: idRespuesta } });
    },
    'preguntas.remove'(preguntaId) {

        if (!Meteor.user() || Meteor.user().profile.role !== 'admin') {
            throw new Meteor.Error('not-authorized');
        }
        if (!preguntaId || Object.keys(preguntaId).length === 0) {
            throw new Meteor.Error('invalid-id', "El id de la pregunta a eliminar es invalido");
        }
        Preguntas.remove(preguntaId);
    },
    'preguntas.removeHijo'(respuestaId) {
        if (!Meteor.user() || Meteor.user().profile.role !== 'admin') {
            throw new Meteor.Error('not-authorized');
        }
        if (!respuestaId || Object.keys(respuestaId).length === 0) {
            throw new Meteor.Error('invalid-id', "El id de la respuesta a eliminar es invalido");
        }
        return Preguntas.update({}, { $pull: { respuestasHijo: respuestaId } });
    }

});
