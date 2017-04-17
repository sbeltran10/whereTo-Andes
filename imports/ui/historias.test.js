import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import HistoriasComponet from './components/historias';
import { Historias } from '../api/historias.js';

Factory.define("historia", Historias, {});

describe("Historias", function () {

  /*it("Historias - Renders correctly", function () {
    const historia = Factory.build('historia',
        {
         "nombre": "1",
         "fecha": {
             "date": "2017-03-06T03:42:51.976Z"
         },
         "usuario": {
             _id: new Mongo.ObjectID("58bb814fd5309c00110d995c")
         },
         "pasos": [
             {
               "pregunta": {
                   "oid": "58bb814fd5309c00110d995c"
               },
               "respuesta": {
                   "oid": "58bb8187d5309c00110d995d"
               },
               "_id": {
                   "oid": "58bcdabb75abc0001105d6bf"
               }
           }
         ]
       }
    );
    var currentUser ={
        _id:"58bb814fd5309c00110d995c"
    }
    const result  = shallow(<HistoriasComponet currentUser={currentUser}/>);
    console.log(result.childAt(0));
    chai.assert(result.childAt(0).hasClass('historias'));
  })*/


  if (!Meteor.isServer) {
  	it("Sin Historias - Renders correctly", function () {
      var currentUser ={
          _id:"as"
      }
  		const result  = shallow(<HistoriasComponet currentUser={currentUser}/>);

  	  chai.assert(result.childAt(0).childAt(0).hasClass('mensajeHistorias'));
  	})
  }

})
