import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { DDP } from 'meteor/ddp-client';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { assert } from 'meteor/practicalmeteor:chai';
import { Promise } from 'meteor/promise';
import { generarDatos } from '../api/generar-datos.test.js';
import { Preguntas } from '../api/preguntas.js';
import { Respuestas } from '../api/respuestas.js';
import { Resultados } from '../api/resultados.js';
import { Historias } from '../api/historias.js';

// Utility -- returns a promise which resolves when all subscriptions are done
const waitForSubscriptions = () => new Promise(resolve => {
    const poll = Meteor.setInterval(() => {
        if (DDP._allSubscriptionsReady()) {
            Meteor.clearInterval(poll);
            resolve();
        }
    }, 200);
});
// Tracker.afterFlush runs code when all consequent of a tracker based change
//   (such as a route change) have occured. This makes it a promise.
//const afterFlushPromise = denodeify(Tracker.afterFlush);
if (Meteor.isClient) {
    describe('data available when routed', () => {
        // First, ensure the data that we expect is loaded on the server
        //   Then, route the app to the homepage
        beforeEach(function () {
            Meteor.call('generarDatos', function () {
                /*
                FlowRouter.go('/')
                    .then(waitForSubscriptions)
                    */
            })
        }

        );
        describe('sin hacer login', () => {
            it('existen todas las preguntas', () => {
                assert.equal(Preguntas.find().count(), 3);
            });
            it('existen todas las respuestas', () => {
                assert.equal(Respuestas.find().count(), 3);
            });
            /*
            it('renders the correct list when routed to', () => {
                const list = Lists.findOne();
                FlowRouter.go('Lists.show', { _id: list._id });
                return afterFlushPromise()
                    .then(waitForSubscriptions)
                    .then(() => {
                        assert.equal($('.title-wrapper').html(), list.name);
                        assert.equal(Todos.find({ listId: list._id }).count(), 3);
                    });
            });
            */
        });
    });
}
