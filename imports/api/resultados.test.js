import { Meteor } from 'meteor/meteor';
import { Resultados } from './resultados.js';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

if (Meteor.isServer) {
    describe('Resultados', function () {
        describe('methods', function () {
            let resultadoId;
            let userIdAdmin;
            let userId;

            var resultadoAInsertar = {
                nombre: 'test nombre resultado',
                ubicacion: 'test ubicacion resultado',
                imagen: 'test imagen resultado',
                comoLlegar: 'test como llegar resultado',
                horario: 'test horario resultado'
            };

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
                it('Un usuario sin privilegios de administrador no puede insertar un resultado', function () {
                    Meteor.user = function () {
                        const users = Meteor.users.find({ _id: userId }).fetch();
                        if (!users || users.length > 1)
                            throw new Error("Meteor.user() mock no puede encontrar al usuario.");
                        return users[0];
                    };

                    // Encontrar la definicion del metodo
                    const insertResultado = Meteor.server.method_handlers['resultados.insert'];
                    // Invocacion falsa del metodo
                    const invocation = { userId };
                    // Correr el metodo y verificar resultado
                    try {
                        insertResultado.apply({ userId }, [resultadoAInsertar]);
                        assert.fail(Resultados.find().count(), 0, "Se deberia generar un error");
                    }
                    catch (e) {
                        assert.equal(e.error, 'not-authorized', "El error deberia se por autorizacion");
                    }
                });

                it('Un usuario con privilegios de administrador puede insertar un resultado', function () {
                    Meteor.user = function () {
                        const users = Meteor.users.find({ _id: userIdadmin }).fetch();
                        if (!users || users.length > 1)
                            throw new Error("Meteor.user() mock no puede encontrar al usuario.");
                        return users[0];
                    };
                    // Encontrar la definicion del metodo
                    const insertResultado = Meteor.server.method_handlers['resultados.insert'];
                    // Invocacion falsa del metodo
                    const invocation = { userIdadmin };
                    // Correr el metodo
                    insertResultado.apply(userIdadmin, [resultadoAInsertar]);
                    // Verifica que el metodo hizo lo que se esperaba
                    assert.equal(Resultados.find().count(), 1, "Se deberia encontrar el resultado recien agregado");
                });
            });

            describe('remove', function () {
                beforeEach(function () {
                    resetDatabase(null);
                    resultadoId = Resultados.insert(resultadoAInsertar);
                    userIdadmin = Accounts.createUser(testUserAdmin);
                    userId = Accounts.createUser(testUser);
                });
                it('Un usuario sin privilegios de administrador no puede eliminar un resultado', function () {
                    Meteor.user = function () {
                        const users = Meteor.users.find({ _id: userId }).fetch();
                        if (!users || users.length > 1)
                            throw new Error("Meteor.user() mock no puede encontrar al usuario.");
                        return users[0];
                    };
                    // Encontrar la definicion del metodo
                    const removeResultado = Meteor.server.method_handlers['resultados.remove'];
                    // Invocacion falsa del metodo
                    const invocation = { userId };
                    // Correr el metodo y verificar resultado
                    try {
                        removeResultado.apply({ userId }, [resultadoId]);
                        assert.fail(Resultados.find().count(), 1, "Se deberia generar un error");
                    }
                    catch (e) {
                        console.log(e);
                        assert.equal(e.error, 'not-authorized', "Se deberia generar un error por autorizacion");
                    }
                });

                it('Un usuario con privilegios de administrador puede eliminar un resultado', function () {
                    Meteor.user = function () {
                        const users = Meteor.users.find({ _id: userIdadmin }).fetch();
                        if (!users || users.length > 1)
                            throw new Error("Meteor.user() mock no puede encontrar al usuario.");
                        return users[0];
                    };
                    // Encontrar la definicion del metodo
                    const removeResultado = Meteor.server.method_handlers['resultados.remove'];
                    // Invocacion falsa del metodo
                    const invocation = { userIdadmin };
                    // Correr el metodo
                    removeResultado.apply(userIdadmin, [resultadoId]);
                    // Verifica que el metodo hizo lo que se esperaba
                    assert.equal(Resultados.find().count(), 0, "Se deberia haber eliminado el resultado");
                });
            });

        });
    });
}
