import { Mongo } from 'meteor/mongo';

export const Resultados = new Mongo.Collection('resultados');

Resultados.schema = new SimpleSchema({
    nombre: { type: String },
    ubicacion: { type: String, optional: true },
    imagen: { type: String, optional: true },
    comoLlegar: { type: String, optional: true },
    horario: { type: String, optional: true }
});

Resultados.attachSchema(Resultados.schema);
