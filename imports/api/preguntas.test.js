import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Preguntas } from './preguntas.js';
import { assert } from 'meteor/practicalmeteor:chai';

if (Meteor.isServer) {
    describe('Preguntas', () => {
        describe('methods', () => {
            let preguntaId;

            beforeEach(() => {
                Preguntas.remove({});
                preguntaId = Preguntas.insert({
                    contenido: "pregunta test 1",
                    respuestasHijo: []
                });
            });

            it('se puede eliminar pregunta', () => {
                // Find the internal implementation of the task method so we can
                // test it in isolation
                const removePregunta = Meteor.server.method_handlers['preguntas.remove'];

                // Set up a fake method invocation that looks like what the method expects
                const invocation = { preguntaId };

                // Run the method with `this` set to the fake invocation
                removePregunta.apply(invocation);

                // Verify that the method does what we expected
                assert.equal(Preguntas.find().count(), 0);
            });
        });
    });
}