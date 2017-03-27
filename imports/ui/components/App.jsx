import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Meteor } from 'meteor/meteor';
import { Preguntas } from '../../api/preguntas.js';
import { Respuestas } from '../../api/respuestas.js';
import { Resultados } from '../../api/resultados.js';
import { Historias } from '../../api/historias.js';
import RespuestasComponent from './respuestas';
import ResultadoComponent from './resultado';
import CreacionComponent from './creacion';
import Registro from './registro';
import HistoriasComponet from './historias';
import Header from './Header.jsx'

const ROOT_URL = "https://whereto-andes-server.herokuapp.com";
const PREGUNTA_INICIO = "58bb814fd5309c00110d995c";

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idPregunta: '',
      pregunta: '',
      respuestas: [],
      resultado: {},
      atras: false,
      resultadoBoolean: false,
      idUsuario: '',
      historias: [],
      historia: {},
      modoCreacion: false,
      modoEliminacion: false,
      pasos: [],
      respuestaAEliminar: null,
      confirmacionResultado: null

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
          idPregunta: pregunta._id,
          respuestas: respuestasHijo,
        });
      }
    });
    this.setState({
      respuestaAEliminar: null,
      modoEliminacion: false
    })
  }

  cargarRespuesta(id, pregunta, idPregunta) {
    var a = this;
    var pasos = this.state.pasos;
    pasos.push({
      pregunta: { _id: idPregunta },
      respuesta: { _id: id }
    });
    console.log(pasos);
    this.loadInterval && this.setState({
      pregunta: pregunta.contenido,
      respuestas: respuestasHijo,
      atras: true,
      pasos: pasos
    });
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
    var pasos = this.state.pasos;
    pasos.push({
      pregunta: { _id: id }
    });
    console.log(pasos);
    Deps.autorun(function () {
      resultado = Resultados.findOne(id);
      if (resultado) {
        a.loadInterval && a.setState({
          resultado: {
            nombre: resultado.nombre,
            ubicacion: resultado.ubicacion,
            imagen: resultado.imagen,
            horario: resultado.horario,
            pasos: pasos,
          },
          resultadoBoolean: true
        });
      }
    });
    this.setState({
      respuestaAEliminar: null,
      modoEliminacion: false
    })
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
    var historia = {
      nombre: nombre,
      fecha: this.getCurrentDate(),
      pasos: this.state.pasos,
      usuario: this.props.currentUser._id
    }

    Meteor.call('historias.insert', historia);
    alert("La historia ha sido creada de forma exitosa");
  }

  cargarHistoria(id) {
    var a = this;
    Deps.autorun(function () {
      historia = Historias.findOne(id);
      if (historia) {
        a.loadInterval && a.setState({
          pasos: historia.pasos,
          resultadoBoolean: true,
        });
        console.log(historia.pasos);
        a.cargarResultado(historia.pasos[(historia.pasos.length) - 1].pregunta);
      }
    });
  }

  toggleModoCreacion() {
    if (this.state.modoCreacion)
      this.setState({ modoCreacion: false });
    else
      this.setState({ modoCreacion: true });
  }

  confirmarCreacion(respuesta) {
    this.setState({
      modoCreacion: false,
      confirmacionResultado: 'Se agrego exitosamente la respuesta "' + respuesta + '"'
    })
  }

  cancelarCreacion() {
    this.setState({
      modoCreacion: false
    })
  }


  desactivarModoEliminacion() {
    this.setState({ modoEliminacion: false, respuestaAEliminar: null });
  }

  prepararRespuestaAEliminar(respuesta) {
    this.setState({
      modoEliminacion: true,
      respuestaAEliminar: respuesta
    })
  }

  eliminarRespuesta() {
    var respId = this.state.respuestaAEliminar._id;
    Meteor.call('respuestas.remove', this.state.respuestaAEliminar._id, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        Meteor.call('preguntas.removeHijo', respId, function (error, result) {
          if (error) {
            console.log(error);
          } else {

          }
        });
      }
    });
    this.confirmarEliminacion(this.state.respuestaAEliminar.contenido);
    this.setState({
      modoEliminacion: false,
      respuestaAEliminar: null
    })

  }

  confirmarEliminacion(respuesta) {
    this.setState({
      confirmacionResultado: 'Se elimino exitosamente la respuesta "' + respuesta + '"'
    })
  }

  dismissConfirmacion() {
    this.setState({
      confirmacionResultado: null
    })
  }

  render() {
    return (
      <div>
        <Header />
        <section id="preguntas" className="about section">
          {this.state.resultadoBoolean ?
            <section id="resultados" className="about section">
              <ResultadoComponent currentUser={this.props.currentUser} resultado={this.state.resultado} guardarHistoria={this.guardarHistoria.bind(this)} />
            </section> :
            <div>
              <div className="row">
                <div className="col-md-12">
                  <h2 className="title text-center">{this.state.pregunta}</h2>
                </div>
              </div>
              <div className="row">
                <div id="esconder">
                  <RespuestasComponent respuestaAEliminar={this.state.respuestaAEliminar} toggleModoCreacion={this.toggleModoCreacion.bind(this)} currentUser={this.props.currentUser} idPregunta={this.state.idPregunta} pregunta={this.state.pregunta} respuestas={this.state.respuestas} cargarPregunta={this.cargarPregunta.bind(this)} cargarRespuesta={this.cargarRespuesta.bind(this)}
                    prepararRespuestaAEliminar={this.prepararRespuestaAEliminar.bind(this)} />
                </div>
              </div>
            </div>
          }
          {this.state.modoCreacion ?
            <section id="modo-creacion" className="about section">
              <CreacionComponent confirmarCreacion={this.confirmarCreacion.bind(this)} cancelarCreacion={this.cancelarCreacion.bind(this)} idPregunta={this.state.idPregunta} cargarRespuesta={this.cargarRespuesta.bind(this)} />
            </section> : ''
          }
          {this.state.modoEliminacion ?
            <section id="eliminacion" className="about section">
              <div className="alert alert-danger ">
                <strong>Peligro!</strong> Eliminar la respuesta <strong>"{this.state.respuestaAEliminar.contenido}"</strong> causara que su resultado o pregunta y respuestas subsecuentes sean eliminados tambien,
             ¿Estas seguro que deseas eliminar esta respuesta? <a className="alert-link" href="#preguntas" onClick={() => this.eliminarRespuesta()}>Aceptar</a> ó <a className="alert-link" href="#preguntas" onClick={() => this.desactivarModoEliminacion()}>Rechazar</a>.
        </div>
            </section> : ''
          }
          {this.state.confirmacionResultado ?
            <section id="confirmacion" className="about section">
              <div className="alert alert-info ">
                <strong>Informacion:</strong> {this.state.confirmacionResultado}. <a className="alert-link" href="#preguntas" onClick={() => this.dismissConfirmacion()}>Aceptar</a>
              </div>
            </section> : ''
          }
        </section>
        {this.props.currentUser ?
          <section id="historiales" className="about section">
            <div className="row">
              <div className="col-md-12">
                <h2 className="title text-center">Historiales</h2>
                <HistoriasComponet currentUser={this.props.currentUser} cargarHistoria={this.cargarHistoria.bind(this)} />
              </div>
            </div>
          </section> : ''
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
