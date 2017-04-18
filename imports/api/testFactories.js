import { Factory } from 'meteor/dburles:factory';
import { Meteor } from 'meteor/meteor';
import { Preguntas } from './preguntas.js';
import { Respuestas } from './respuestas.js';
import { Resultados } from './resultados.js';
import { Historias } from './historias.js';

// NO SIRVEN POR LOS ESQUEMAS

Factory.define('pregunta', Preguntas, {
    contenido: 'test contenido pregunta',
    respuestasHijo: []
});

Factory.define('respuesta', Respuestas, {
    contenido: 'test contenido respuesta',
    simbolo: 'test simbolo',
    preguntasHijo: [],
    resultadosHijo: []
});

Factory.define('resultado', Resultados, {
    nombre: 'test nombre resultado',
    ubicacion: 'test ubicacion resultado',
    imagen: 'test imagen resultado',
    comoLlegar: 'test como llegar resultado',
    horario: 'test horario resultado'
});

Factory.define('historia', Historias, {
    nombre: 'test nombre historia',
    fecha:  new Date(),
    usuario: 'test usuario id',
    pasos: []
});
