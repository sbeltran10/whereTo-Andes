import { Mongo } from 'meteor/mongo';

export const Respuestas = new Mongo.Collection('respuestas');

Respuestas.schema = new SimpleSchema({
    contenido: { type: String},
    simbolo: { type: String, optional:true},
    preguntaHijo:{ type: String, optional:true},
    resultadoHijo: { type: String, optional:true}
});

Respuestas.attachSchema(Respuestas.schema);
