import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// Limite de llamados a los metodos
const LISTS_METHODS = _.pluck([
    insert,
    remove,
    insertRespuesta,
    removeHijo,

], 'name');
// Solo permite 3 llamados por segundo
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(LISTS_METHODS, name);
        },
        // Rate limit per connection ID
        connectionId() { return true; }
    }, 5, 1000);
}

// Denegar a los usuarios actualizar la coleccion usuario

//podrian tambien denegar los deletes desde el lado de los usuarios si quieren

Meteor.users.deny({
  update() { return true; }
});
