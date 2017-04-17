import React, { Component } from 'react';
import Historia from './historia';
import { Historias } from '../../api/historias.js';

class HistoriasComponet extends Component {

    render() {
      historias=[];
      var a = this;
      Tracker.autorun(function () {
        historias = Historias.find({usuario:a.props.currentUser._id}).fetch();
      });
      return (
          <div>
            {historias.length ?
              <div>
                {historias.map((historia, index) => {
                    return <Historia key={index} historia={historia} cargarHistoria={this.props.cargarHistoria.bind(this)} />
                })}
              </div>:
              <div>
                  <div className="mensajeHistorias">No tienes ningún registro en tu historia.</div>
              </div>
            }
          </div>
      );
    }
}

export default HistoriasComponet;

Meteor.subscribe('historias');
Meteor.subscribe('respuestas');
Meteor.subscribe('preguntas');
Meteor.subscribe('resultados');