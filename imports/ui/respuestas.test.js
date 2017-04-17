import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import RespuestasComponent from './components/respuestas';
import { Respuestas } from '../api/respuestas.js';
import { Preguntas } from '../api/preguntas.js';

Factory.define("respuesta", Respuestas, {});
Factory.define("pregunta", Preguntas, {});

describe("Respuesta", function () {



	it("Renders correctly", function () {
		const respuesta = Factory.build('pregunta',
    {
      "contenido": "Académica",
      "resultadosHijo": [],
      "preguntasHijo": [
          {
              "$oid": "58bb8310d5309c00110d9963"
          }
      ],
      "preguntasPadre": [
          {
              "$oid": "58bb814fd5309c00110d995c"
          }
      ]
    });

    const pregunta = Factory.build('pregunta',
    {
      "contenido": "¿Qué tipo de ayuda académica crees necesitar?",
      "respuestasHijo": [
          {
              "$oid": "58bc1fe68fa57f0011be6b38"
          },
          {
              "$oid": "58bc204b8fa57f0011be6b39"
          }
      ],
      "respuestasPadre": []
    });

		const result  = shallow(<RespuestasComponent pregunta={pregunta}/>);

	  chai.assert(result.hasClass('text-center'));
	})
})
