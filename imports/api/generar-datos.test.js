import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { _ } from 'meteor/underscore';
import { Preguntas } from '../api/preguntas.js';
import { Respuestas } from '../api/respuestas.js';
import { Resultados } from '../api/resultados.js';
import { Historias } from '../api/historias.js';

// NO SIRVEN POR LOS ESQUEMAS

const crearPreguntas = (userId) => {
    _.times(3, () => Preguntas.insert({
        contenido: "pregunta test 1",
        respuestasHijo: []
    }));
};

const crearRespuestas = (userId) => {
    _.times(3, () => Respuestas.insert({
        contenido: 'test contenido respuesta',
        simbolo: 'test simbolo',
        preguntasHijo: [],
        resultadosHijo: []
    }));
};

// Remember to double check this is a test-only file before
// adding a method like this!
Meteor.methods({
    'generarDatos'() {
        Preguntas.remove({});
        Respuestas.remove({});
        crearPreguntas();
        crearRespuestas();
    },
});
let generarDatos;
if (Meteor.isClient) {
    // Create a second connection to the server to use to call
    // test data methods. We do this so there's no contention
    // with the currently tested user's connection.
    const testConnection = Meteor.connect(Meteor.absoluteUrl());
}
export { generarDatos };

