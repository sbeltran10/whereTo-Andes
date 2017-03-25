import { Mongo } from 'meteor/mongo';

export const Preguntas = new Mongo.Collection('preguntas');

Preguntas.schema = new SimpleSchema({
    contenido: { type: String},
    respuestasHijo : {type: [String], optional: true}
});

Preguntas.attachSchema(Preguntas.schema);
