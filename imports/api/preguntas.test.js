import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Preguntas } from './preguntas.js';
import { Respuestas } from './respuestas.js';
import { Factory } from 'meteor/dburles:factory';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

if (Meteor.isServer) {
    describe('Preguntas', function () {
        describe('methods', function () {
            let preguntaId;
            let userIdAdmin;
            let userId;

            var preguntaAInsertar = {
                contenido: "pregunta test 1",
                respuestasHijo: []
            };

            var respuestaAInsertar = {
                contenido: 'test contenido respuesta',
                simbolo: 'test simbolo',
                preguntasHijo: [],
                resultadosHijo: []
            }

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
            describe('insert', function () {
                beforeEach(function () {

                    resetDatabase(null);
                    userIdadmin = Accounts.createUser(testUserAdmin);
                    userId = Accounts.createUser(testUser);


                });
                it('Un usuario sin privilegios de administrador no puede insertar una pregunta', function () {
                    Meteor.user = function () {
                        const users = Meteor.users.find({ _id: userId }).fetch();
                        if (!users || users.length > 1)
                            throw new Error("Meteor.user() mock no puede encontrar al usuario.");
                        return users[0];
                    };

                    console.log(Meteor.user());
                    // Encontrar la definicion del metodo
                    const insertPregunta = Meteor.server.method_handlers['preguntas.insert'];
                    // Invocacion falsa del metodo
                    const invocation = { userId };
                    // Correr el metodo y verificar resultado
                    try {
                        insertPregunta.apply({ userId }, [preguntaAInsertar]);
                        assert.fail(Preguntas.find().count(), 0);
                    }
                    catch (e) {
                        assert.equal(e.error, 'not-authorized');
                    }
                });

                it('Un usuario con privilegios de administrador puede insertar una pregunta', function () {
                    Meteor.user = function () {
                        const users = Meteor.users.find({ _id: userIdadmin }).fetch();
                        if (!users || users.length > 1)
                            throw new Error("Meteor.user() mock no puede encontrar al usuario.");
                        return users[0];
                    };
                    // Encontrar la definicion del metodo
                    const insertPregunta = Meteor.server.method_handlers['preguntas.insert'];
                    // Invocacion falsa del metodo
                    const invocation = { userIdadmin };
                    // Correr el metodo
                    insertPregunta.apply(userIdadmin, [preguntaAInsertar]);
                    // Verifica que el metodo hizo lo que se esperaba
                    assert.equal(Preguntas.find().count(), 1);
                });
            });

            describe('insertRespuesta', function () {
                beforeEach(function () {

                    resetDatabase(null);
                    preguntaId = Preguntas.insert(preguntaAInsertar);
                    respuestaId = Respuestas.insert(respuestaAInsertar);
                    userIdadmin = Accounts.createUser(testUserAdmin);
                    userId = Accounts.createUser(testUser);


                });
                it('Un usuario con privilegios de administrador insertar una respuesta a una pregunta existente', function () {
                    Meteor.user = function () {
                        const users = Meteor.users.find({ _id: userIdadmin }).fetch();
                        if (!users || users.length > 1)
                            throw new Error("Meteor.user() mock no puede encontrar al usuario.");
                        return users[0];
                    };

                    console.log(Meteor.user());
                    // Encontrar la definicion del metodo
                    const insertRespuesta = Meteor.server.method_handlers['preguntas.insertRespuesta'];
                    // Invocacion falsa del metodo
                    const invocation = { userIdadmin };
                    // Correr el metodo y verificar resultado
                    console.log(insertRespuesta.apply({ userIdadmin }, [preguntaId, respuestaId]));
                });

            });

            describe('remove', function () {
                beforeEach(function () {
                    resetDatabase(null);
                    preguntaId = Preguntas.insert(preguntaAInsertar);
                    userIdadmin = Accounts.createUser(testUserAdmin);
                    userId = Accounts.createUser(testUser);
                });
                it('Un usuario sin privilegios de administrador no puede eliminar una pregunta', function () {
                    Meteor.user = function () {
                        const users = Meteor.users.find({ _id: userId }).fetch();
                        if (!users || users.length > 1)
                            throw new Error("Meteor.user() mock no puede encontrar al usuario.");
                        return users[0];
                    };
                    // Encontrar la definicion del metodo
                    const removePregunta = Meteor.server.method_handlers['preguntas.remove'];
                    // Invocacion falsa del metodo
                    const invocation = { userId };
                    // Correr el metodo y verificar resultado
                    try {
                        removePregunta.apply({ userId }, [preguntaId]);
                        assert.fail(Preguntas.find().count(), 1);
                    }
                    catch (e) {
                        assert.equal(e.error, 'not-authorized');
                    }
                });

                it('Un usuario con privilegios de administrador puede eliminar una pregunta', function () {
                    Meteor.user = function () {
                        const users = Meteor.users.find({ _id: userIdadmin }).fetch();
                        if (!users || users.length > 1)
                            throw new Error("Meteor.user() mock no puede encontrar al usuario.");
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
    });
}
