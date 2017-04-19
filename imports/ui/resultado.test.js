import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import ResultadoComponent from './components/resultado';
import { Resultados } from '../api/resultados.js';

Factory.define("resultado", Resultados, {});


if (!Meteor.isServer) {
	describe("Resultado", function () {

		let resultado;

		beforeEach(() => {
			resultado = Factory.build('resultado',
			{
        nombre: "Resultado test Component",
        ubicacion: "Un lugar",
        imagen: "Una URL",
        comoLlegar: "Unas indicaciones",
        horario: "Un horario"
			});

      resultadoVacio = Factory.build('resultado',
			{
			});
	  });

		it("Resultado con contenido - Renders correctly", function () {

			const res  = shallow(<ResultadoComponent resultado={resultado}/>);

		  chai.assert(res.childAt(0).childAt(2).hasClass("pad"), 'La clase no se encuentra, problemas de renderizado');

    });

    it("Resultado sin contenido - Renders correctly", function () {

			const res  = shallow(<ResultadoComponent resultado={resultadoVacio}/>);

		  chai.assert(res.childAt(0).childAt(0).childAt(0).hasClass("sinSolucion"), 'La clase no se encuentra, problemas de renderizado');

    });
	});
}
