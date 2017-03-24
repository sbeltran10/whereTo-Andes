import { Mongo } from 'meteor/mongo';

export const Historias = new Mongo.Collection('historias');

Historias.schema = new SimpleSchema({
    nombre: { type: String },
    fecha: { type: Date },
    usuario: { type: String },
    pasos: [{
        pregunta:{ type: Object },
        respuesta: { type: Object }
    }]
});

Historias.attachSchema(Historias.schema);
