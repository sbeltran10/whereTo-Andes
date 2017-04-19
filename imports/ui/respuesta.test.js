import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import RespuestaComponent from './components/respuesta';
import { Respuestas } from '../api/respuestas.js';

Factory.define("respuesta", Respuestas, {});


if (!Meteor.isServer) {
	describe("Respuesta", function () {

		let respuesta;

		beforeEach(() => {
			respuesta = Factory.build('respuesta',
			{
				"contenido": "Académica",
				"resultadosHijo": [],
				"preguntasHijo": [
				],
				"preguntasPadre": [
				]
			});
	  });

		it("Respuesta - Renders correctly", function () {

			const noRespuestaAEliminar  = shallow(<RespuestaComponent respuesta={respuesta}  />);

		  chai.assert(noRespuestaAEliminar.childAt(0).hasClass("noRespuestaAEliminar"), 'La clase no se encuentra, problemas de renderizado');
		})

		it("Respuesta Admin - Renders correctly", function () {

			var currentUser ={
				profile:{
					role:'admin'
				}
			}
			const noRespuestaAEliminarAdmin  = shallow(<RespuestaComponent currentUser={currentUser} respuesta={respuesta}  />);

		  chai.assert(noRespuestaAEliminarAdmin.childAt(0).hasClass("noRespuestaAEliminarAdmin"), 'La clase no se encuentra, problemas de renderizado');
		})

		it("Respuesta A eliminar - Renders correctly", function () {

			const respuestaAEliminar  = shallow(<RespuestaComponent currentUser="a12" respuestaAEliminar={respuesta} respuesta={respuesta}  />);

		  chai.assert(respuestaAEliminar.hasClass("respuestaAEliminar"), 'La clase no se encuentra, problemas de renderizado');

		})
	});
}
