import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Historias = new Mongo.Collection('historias', { idGeneration: 'MONGO' });

Historias.schema = new SimpleSchema({
    nombre: { type: String },
    fecha: { type: Date },
    usuario: { type: String },
    pasos: { type: [Object]}
});

// Se encarga de realizar todas las verificaciones usando el esquema definido previamente
Historias.attachSchema(Historias.schema);


if (Meteor.isServer) {
    Meteor.publish('historias', function historiasPublication() {
        return Historias.find({usuario:this.userId},{
            fields: {
                nombre: 1,
                fecha: 1,
                usuario: 1,
                pasos: 1
            }
        });
    });
}


Meteor.methods({
    'historias.insert'(historia) {

        // Verificacion de logeo y rol
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        return Historias.insert(historia);
    },
    'historias.remove'(historiaId) {
        if (!Meteor.user()) {
            throw new Meteor.Error('not-authorized');
        }
        if (!historiaId || Object.keys(historiaId).length === 0) {
            throw new Meteor.Error('invalid-id', "El id de la historia a eliminar es invalido");
        }
        Historias.remove(historiaId);
    },
});
