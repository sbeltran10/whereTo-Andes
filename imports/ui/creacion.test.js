import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import CreacionComponent from './components/creacion';


if (!Meteor.isServer) {
	describe("Creacion", function () {

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
	  });

		it("Resultado - Renders correctly", function () {

			const resultado  = shallow(<CreacionComponent/>);
		  chai.assert(resultado.hasClass("creacion-datos-respuesta"), 'La clase no se encuentra, problemas de renderizado');

    });
	});
}
