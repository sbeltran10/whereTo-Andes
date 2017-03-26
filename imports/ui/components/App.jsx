import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Meteor } from 'meteor/meteor';
import { Preguntas } from '../../api/preguntas.js'
import { Respuestas } from '../../api/respuestas.js'
import { Resultados } from '../../api/resultados.js'
import RespuestasComponent from './respuestas';
import ResultadoComponent from './resultado';
import CreacionComponent from './creacion';
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
      numero: 0,
      resultadoBoolean: false,
      idUsuario: '',
      historias: [],
      historia: {},
      modoCreacion: false
    }
    this.cargarPregunta(PREGUNTA_INICIO);
  }

  componentDidMount() {
    this.loadInterval = setInterval(this.loadSearches, this.props.pollInterval);
  }

  componentWillUnmount() {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  cargarPregunta(id) {
    var a = this;
    Deps.autorun(function () {
      pregunta = Preguntas.findOne({ _id: new Mongo.ObjectID(id) });
      if (pregunta) {
        respuestasHijoId = pregunta.respuestasHijo;
        respuestasHijo = [];
        respuestasHijoId.map((value, index) => {
          v = Respuestas.findOne(value)
          if (v) {
            respuestasHijo.push(v)
          }
        });
        a.loadInterval && a.setState({
          pregunta: pregunta.contenido,
          respuestas: respuestasHijo
        });
      }
    });
  }

  cargarRespuesta(id, pregunta, idPregunta) {
    var a = this;
    Deps.autorun(function () {
      respuesta = Respuestas.findOne(id);
      if (respuesta) {
        if (respuesta.preguntasHijo[0]) {
          a.cargarPregunta(respuesta.preguntasHijo[0]._str);
        } else if (respuesta.resultadosHijo[0]) {
          a.cargarResultado(respuesta.resultadosHijo[0]);
        }
      }
    });
  }

  cargarResultado(id) {
    var a = this;
    Deps.autorun(function () {
      resultado = Resultados.findOne(id);
      console.log(resultado);
      if (resultado) {
        console.log(resultado.nombre);
        a.loadInterval && a.setState({
          resultado: {
            nombre: resultado.nombre,
            ubicacion: resultado.ubicacion,
            imagen: resultado.imagen,
            horario: resultado.horario
          }
        });
        a.setState({
          resultadoBoolean: true
        });
      }
    });
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

  toggleModoCreacion() {
    if (this.state.modoCreacion)
      this.setState({ modoCreacion: false });
    else
      this.setState({ modoCreacion: true });
    console.log(this.state.modoCreacion);
  }



  render() {
    return (
      <div>
        <Header user={this.props.currentUser} />
        <section id="preguntas" className="about section">
          {this.state.resultadoBoolean ?
            <section id="resultados" className="about section">
              <ResultadoComponent guardarHistoria={this.guardarHistoria.bind(this)} resultado={this.state.resultado} />
            </section> :
            <div>
              <div className="row">
                <div className="col-md-12">
                  <h2 className="title text-center">{this.state.pregunta}</h2>
                </div>
              </div>
              <div className="row">
                <div id="esconder">
                  <RespuestasComponent toggleModoCreacion={this.toggleModoCreacion.bind(this)} currentUser={this.props.currentUser} idPregunta={this.state.idPregunta} pregunta={this.state.pregunta} respuestas={this.state.respuestas} cargarPregunta={this.cargarPregunta.bind(this)} cargarRespuesta={this.cargarRespuesta.bind(this)} />
                </div>
              </div>
            </div>
          }
          {this.state.modoCreacion ?
          <section id="modo-creacion" className="about section">
              <CreacionComponent idPregunta={this.state.idPregunta} cargarRespuesta={this.cargarRespuesta.bind(this)}/>
            </section> : ''
        }
        </section>
        {this.props.currentUser ?
          <div className="row">
            <h2 className="title text-center">Historiales</h2>
            <Historias historias={this.state.historias} cargarHistoria={this.cargarHistoria.bind(this)} />
          </div> : ''
        }
      </div>
    )
  }
}

App.propTypes = {
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, App);
