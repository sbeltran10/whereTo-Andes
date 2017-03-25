import { Mongo } from 'meteor/mongo';

export const Preguntas = new Mongo.Collection('preguntas');

Preguntas.schema = new SimpleSchema({
    contenido: { type: String}
});

Preguntas.attachSchema(Preguntas.schema);
