import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import HistoriaComponet from './components/historia';
import { Historias } from '../api/historias.js';

Factory.define("historia", Historias, {});
if (!Meteor.isServer) {
	describe("Historia", function () {

		it("Historia - Renders correctly", function () {
			const historia = Factory.build('historia',
	    {
	    "nombre": "1",
	    "fecha": {
	        "date": "2017-03-06T03:42:51.976Z"
	    },
	    "usuario": {
	        "oid": "58bcc009420dd500112e7129"
	    },
	    "pasos": [
	        {
	            "pregunta": {
	                "oid": "58bb814fd5309c00110d995c"
	            },
	            "respuesta": {
	                "oid": "58bb8187d5309c00110d995d"
	            }
	        }
	    ]
	    });

			const result  = shallow(<HistoriaComponet historia={historia}/>);

		  chai.assert(result.hasClass('boton'));
		})
	})
}
