import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Preguntas } from './preguntas.js';
import { Factory } from 'meteor/dburles:factory';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

if (Meteor.isServer) {
    describe('Preguntas', function () {
        describe('methods', function () {
            let preguntaId;
            let userIdAdmin;
            let userId;

            beforeEach(function () {
                resetDatabase();
                preguntaId = Preguntas.insert({
                    contenido: "pregunta test 1",
                    respuestasHijo: []
                });
                var testUserAdmin = {
                    username: 'usuarioadminprueba',
                    email: 'usuarioadminprueba@prueba.com',
                    password: 'testprueba',
                    profile: {
                        role: 'admin'
                    }
                }

                var testUser = {
                    username: 'usuarioprueba',
                    email: 'usuario@prueba.com',
                    password: 'testprueba',
                    profile: {}
                }

                userIdadmin = Accounts.createUser(testUserAdmin);
                userId = Accounts.createUser(testUser);

            });
            it('Un usuario sin privilegios de administrador no puede eliminar una pregunta', function () {
                Meteor.user = function () {
                    const users = Meteor.users.find({ _id: userId }).fetch();
                    if (!users || users.length > 1)
                        throw new Error("Meteor.user() mock cannot find user by userId.");
                    return users[0];
                };
                console.log(Meteor.user());
                // Encontrar la definicion del metodo
                const removePregunta = Meteor.server.method_handlers['preguntas.remove'];
                // Invocacion falsa del metodo
                const invocation = { userId };
                // Correr el metodo y verificar resultado
                try {
                    removePregunta.apply({ userId }, [preguntaId]);
                    assert.fail(Preguntas.find().count(), 1);
                }
                catch(e){
                    assert.equal(e.error,'not-authorized');
                }
            });

            it('Un usuario con privilegios de administrador puede eliminar una pregunta', function () {
                Meteor.user = function () {
                    const users = Meteor.users.find({ _id: userIdadmin }).fetch();
                    if (!users || users.length > 1)
                        throw new Error("Meteor.user() mock cannot find user by userId.");
                    return users[0];
                };
                // Encontrar la definicion del metodo
                const removePregunta = Meteor.server.method_handlers['preguntas.remove'];
                // Invocacion falsa del metodo
                const invocation = { userIdadmin };
                // Correr el metodo
                removePregunta.apply(userIdadmin, [preguntaId]);
                // Verifica que el metodo hizo lo que se esperaba
                assert.equal(Preguntas.find().count(), 0);
            });


        });
    });
}
