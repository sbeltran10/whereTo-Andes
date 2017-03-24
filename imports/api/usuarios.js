import { Mongo } from 'meteor/mongo';

export const Usuarios = new Mongo.Collection('usuarios');

Usuarios.schema = new SimpleSchema({
    nombre: { type: String },
    correo: { type: String },
    clave: { type: String },
    rol: { type: String }
});

Usuarios.attachSchema(Usuarios.schema);
