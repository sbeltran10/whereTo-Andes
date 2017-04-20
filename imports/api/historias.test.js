import { Meteor } from 'meteor/meteor';
import { Historias } from './historias.js';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

if (Meteor.isServer) {
    describe('Historias', function () {
        describe('methods', function () {
            let preguntaId;
            let userIdAdmin;
            let userId;

            function getCurrentDate() {
              var today = new Date();
              var dd = today.getDate();
              var mm = today.getMonth() + 1; //January is 0!
              var yyyy = today.getFullYear();
              var hh = today.getHours();
              var m = today.getMinutes();
              var s = today.getSeconds();

              if (dd < 10) {
                dd = '0' + dd
              }

              if (mm < 10) {
                mm = '0' + mm
              }

              return mm + '/' + dd + '/' + yyyy + "@" + hh + ":" + m + ":" + s;
            }

            var historiaAInsertar = {
                  nombre: "historia test 1",
                  fecha: getCurrentDate(),
                  usuario: "",
                  pasos: []
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
                  userId = Accounts.createUser(testUser);
                });
                it('Un usuario puede crear una historia', function () {
                  Meteor.user = function () {
                      const users = Meteor.users.find({ _id: userId }).fetch();
                      if (!users || users.length > 1)
                          throw new Error("Meteor.user() mock no puede encontrar al usuario.");
                      return users[0];
                  };
                  historiaAInsertar = {
                        nombre: "historia test 1",
                        fecha: getCurrentDate(),
                        usuario: userId,
                        pasos: []
                  }
                  // Encontrar la definicion del metodo
                  const insertHistoria = Meteor.server.method_handlers['historias.insert'];
                  // Invocacion falsa del metodo
                  const invocation = { userId };
                  // Correr el metodo
                  insertHistoria.apply(userId, [historiaAInsertar]);
                  // Verifica que el metodo hizo lo que se esperaba
                  assert.equal(Historias.find().count(), 1, "Se deberia encontrar la historia recien agregada");
              });
            });
        });
    });
}
