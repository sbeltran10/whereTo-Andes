import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Meteor } from 'meteor/meteor';
import {Preguntas} from '../../api/preguntas.js'
import Respuestas from './respuestas';
import Resultado from './resultado';
import Login from './login';
import Registro from './registro';
import Historias from './historias';
import Historia from './historia';
import Header from './Header.jsx'

const ROOT_URL = "https://whereto-andes-server.herokuapp.com";
const PREGUNTA_INICIO = "58bb814fd5309c00110d995c";

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    var container = document.getElementById('visualization');
    this.state = {
      idPregunta: '',
      pregunta: '',
      respuestas: [],
      resultado: {},
      valoresRed: [],
      numero: 0,
      resultadoBoolean: false,
      idUsuario: '',
      historias: [],
      historia: {}
    }
    this.cargarPregunta(PREGUNTA_INICIO);
  }

  cargarPregunta(id) {
    axios.get(ROOT_URL + "/preguntas/" + id)
      .then(response => {
        this.setState({
          idPregunta: id,
          pregunta: response.data.contenido,
          respuestas: response.data.respuestas
        })
      })
    if (this.state.numero === 1) {
      $('html,body').animate({
        scrollTop: $("#visualization").offset().top
      },
        'slow');
    }
  }

  cargarResultado(id) {
    axios.get(ROOT_URL + "/resultados/" + id)
      .then(response => {
        this.setState({
          resultadoBoolean: true,
          resultado: {
            nombre: response.data.nombre,
            ubicacion: response.data.ubicacion,
            imagen: response.data.imagen,
            horario: response.data.horario
          }
        })
        this.state.numero = this.state.numero + 1;
        this.state.valoresRed.push(
          {
            id: id,
            idRespuesta: "-1",
            numero: this.state.numero,
            pregunta: "Respuesta",
            respuesta: response.data.nombre,
            start: this.getCurrentDate()
          });
        this.cargarTimeline();
      })
  }

  cargarRespuesta(id, pregunta, idPregunta) {
    $(".tituloGrafico").css("visibility", "visible");
    axios.get(ROOT_URL + "/respuestas/" + id)
      .then(response => {
        this.state.numero = this.state.numero + 1;
        this.state.valoresRed.push(
          {
            id: idPregunta,
            idRespuesta: id,
            numero: this.state.numero,
            pregunta: pregunta,
            respuesta: response.data.contenido,
            start: this.getCurrentDate()
          });
        if (response.data.resultadosHijo.length === 0 && response.data.preguntasHijo.length === 0) {
          this.setState({
            resultadoBoolean: true,
            resultado: {
              nombre: ""
            }
          })
        }
        else {
          this.cargarTimeline();
          if (response.data.resultadosHijo.length === 0) {
            this.cargarPregunta(response.data.preguntasHijo[0]);
          } else {
            this.cargarResultado(response.data.resultadosHijo[0]);
          }
        }
      })
  }

  cargarTimeline() {
    // create a handlebars template
    var source = document.getElementById('item-template').innerHTML;
    var template = Handlebars.compile(source);

    // DOM element where the Timeline will be attached
    var container = document.getElementById('visualization');
    $("#visualization").html("");

    // Create a DataSet (allows two way data-binding)
    var items = new vis.DataSet(this.state.valoresRed);

    // Configuration for the Timeline
    var options = {
      // specify a template for the items
      template: template
    };

    var timeline = new vis.Timeline(container, items, options);
    var este = this;
    timeline.on("click", function (params) {
      este.cargarPreguntaTimeline(params.item);
    });
  }

  cargarPreguntaTimeline(item) {
    var termino = false;
    for (var i = this.state.valoresRed.length; i > 0 && !termino; i--) {
      if (this.state.valoresRed[i - 1].id === item) {
        if (this.state.valoresRed[i - 1].idRespuesta === "-1") {
          alert("Ups!!! No puedes volver a la respuesta en la que ya estas :D");
          termino = true;
        } else {
          termino = true;
          this.state.numero = i - 1;
          this.setState({
            resultadoBoolean: false
          });
          this.state.valoresRed.pop();
          this.cargarPregunta(item);
          this.cargarTimeline();
        }
      } else {
        this.state.valoresRed.pop();
      }
    }
  }

  getCurrentDate() {
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

  guardarHistoria(nombre) {
    var pasos = [];
    for (var i = 0; i < this.state.valoresRed.length; i++) {
      var actual = this.state.valoresRed[i];
      if (i === this.state.valoresRed.length - 1) {
        pasos.push({
          pregunta: { pid: actual.id, contenido: actual.pregunta },
          respuesta: {}
        }
        );
      } else {
        pasos.push({
          pregunta: { pid: actual.id, contenido: actual.pregunta },
          respuesta: { rid: actual.idRespuesta, contenido: actual.respuesta }
        }
        );
      }
    }
    var historia = {
      usuario: this.state.idUsuario,
      nombre: nombre,
      pasos: pasos
    }
    axios.post(ROOT_URL + "/historias", historia).then(response => {
      if (response.status === 200) {
        alert("Tu historia se a guardado de forma exitosa");
        this.cargarHistorias(this.state.idUsuario);
      }
      else {
        alert("Ocurrio un error guardando tu historia");
      }
    });
  }

  cargarHistorias(id) {
    axios.get(ROOT_URL + "/historias/usuarios/" + id)
      .then(response => {
        this.setState({
          historias: response.data
        })
      })
  }

  cargarHistoria(id) {
    this.setState({
      idPregunta: '',
      pregunta: '',
      respuestas: [],
      resultado: {},
      valoresRed: [],
      numero: 0,
      historia: {}
    })
    axios.get(ROOT_URL + "/historias/" + id)
      .then(response => {
        this.setState({
          historia: response.data
        })
        this.cargarTimelineConHistoria();
      })
  }

  cargarTimelineConHistoria() {
    for (var i = 0; i < this.state.historia.pasos.length - 1; i++) {
      if (i !== 0) {
        this.cargarPregunta(this.state.historia.pasos[i].pregunta.pid);
      }
      this.cargarRespuesta(this.state.historia.pasos[i].respuesta.rid, this.state.historia.pasos[i].pregunta.contenido, this.state.historia.pasos[i].pregunta.pid);
    }
  }

  getResultados(i) {
    axios.get(ROOT_URL + "/respuestas/" + this.state.historia.pasos[i].respuesta)
      .then(response => {
        this.state.numero = this.state.numero + 1;
        this.state.valoresRed.push(
          {
            id: this.state.historia.pasos[i].pregunta,
            idRespuesta: response.data._id,
            numero: this.state.numero,
            pregunta: res.data.contenido,
            respuesta: response.data.contenido,
            start: this.getCurrentDate()
          });
      });
  }


  render() {
    return (
      <div>
        <Header/>
        <section id="preguntas" className="about section">
          <div className="row">
            <div className="col-md-12">
              <h2 className="title text-center">{this.state.pregunta}</h2>
            </div>
          </div>
          { this.state.resultadoBoolean ?
            <section id="resultados" className="about section">
              <Resultado guardarHistoria={this.guardarHistoria.bind(this)} resultado={this.state.resultado} />
            </section> :
            <div className="row">
              <div id="esconder">
                <Respuestas idPregunta={this.state.idPregunta} pregunta={this.state.pregunta} respuestas={this.state.respuestas} cargarPregunta={this.cargarPregunta.bind(this)} cargarRespuesta={this.cargarRespuesta.bind(this)} />
              </div>
            </div>
          }

        </section>
        { this.props.currentUser ?
          <div className="row">
            <h2 className="title text-center">Historiales</h2>
            <Historias historias={this.state.historias} cargarHistoria={this.cargarHistoria.bind(this)} />
          </div>: ''
        }
      </div>
    )
  }
}

App.propTypes = {
  preguntas: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    preguntas: Preguntas.find({}).fetch(),
    currentUser: Meteor.user(),
  };
}, App);
