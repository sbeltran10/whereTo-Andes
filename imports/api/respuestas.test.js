import { Meteor } from 'meteor/meteor';
import { Preguntas } from './preguntas.js';
import { Respuestas } from './respuestas.js';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

if (Meteor.isServer) {
    describe('Respuestas', function () {
        describe('methods', function () {
            let preguntaId;
            let userIdAdmin;
            let userId;

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
                it('Un usuario sin privilegios de administrador no puede insertar una respuesta', function () {
                    Meteor.user = function () {
                        const users = Meteor.users.find({ _id: userId }).fetch();
                        if (!users || users.length > 1)
                            throw new Error("Meteor.user() mock no puede encontrar al usuario.");
                        return users[0];
                    };

                    // Encontrar la definicion del metodo
                    const insertRespuesta = Meteor.server.method_handlers['respuestas.insert'];
                    // Invocacion falsa del metodo
                    const invocation = { userId };
                    // Correr el metodo y verificar resultado
                    try {
                        insertRespuesta.apply({ userId }, [respuestaAInsertar]);
                        assert.fail(Preguntas.find().count(), 0, "Se deberia generar un error");
                    }
                    catch (e) {
                        assert.equal(e.error, 'not-authorized', "El error deberia se por autorizacion");
                    }
                });

                it('Un usuario con privilegios de administrador puede insertar una respuesta', function () {
                    Meteor.user = function () {
                        const users = Meteor.users.find({ _id: userIdadmin }).fetch();
                        if (!users || users.length > 1)
                            throw new Error("Meteor.user() mock no puede encontrar al usuario.");
                        return users[0];
                    };
                    // Encontrar la definicion del metodo
                    const insertRespuesta = Meteor.server.method_handlers['respuestas.insert'];
                    // Invocacion falsa del metodo
                    const invocation = { userIdadmin };
                    // Correr el metodo
                    insertRespuesta.apply(userIdadmin, [respuestaAInsertar]);
                    // Verifica que el metodo hizo lo que se esperaba
                    assert.equal(Respuestas.find().count(), 1, "Se deberia encontrar la respuesta recien agregada");
                });
            });

            describe('remove', function () {
                beforeEach(function () {
                    resetDatabase(null);
                    respuestaId = Respuestas.insert(respuestaAInsertar);
                    userIdadmin = Accounts.createUser(testUserAdmin);
                    userId = Accounts.createUser(testUser);
                });
                it('Un usuario sin privilegios de administrador no puede eliminar una respuesta', function () {
                    Meteor.user = function () {
                        const users = Meteor.users.find({ _id: userId }).fetch();
                        if (!users || users.length > 1)
                            throw new Error("Meteor.user() mock no puede encontrar al usuario.");
                        return users[0];
                    };
                    // Encontrar la definicion del metodo
                    const respuestaPregunta = Meteor.server.method_handlers['respuestas.remove'];
                    // Invocacion falsa del metodo
                    const invocation = { userId };
                    // Correr el metodo y verificar resultado
                    try {
                        respuestaPregunta.apply({ userId }, [respuestaId]);
                        assert.fail(Respuestas.find().count(), 1, "Se deberia generar un error");
                    }
                    catch (e) {
                        assert.equal(e.error, 'not-authorized', "Se deberia generar un error por autorizacion");
                    }
                });

                it('Un usuario con privilegios de administrador puede eliminar una respuesta', function () {
                    Meteor.user = function () {
                        const users = Meteor.users.find({ _id: userIdadmin }).fetch();
                        if (!users || users.length > 1)
                            throw new Error("Meteor.user() mock no puede encontrar al usuario.");
                        return users[0];
                    };
                    // Encontrar la definicion del metodo
                    const removeRespuesta = Meteor.server.method_handlers['respuestas.remove'];
                    // Invocacion falsa del metodo
                    const invocation = { userIdadmin };
                    // Correr el metodo
                    removeRespuesta.apply(userIdadmin, [respuestaId]);
                    // Verifica que el metodo hizo lo que se esperaba
                    assert.equal(Respuestas.find().count(), 0, "Se deberia haber eliminado la respuesta");
                });
            });
        });
    });
}
