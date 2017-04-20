import React, { Component } from 'react';
import { Historias } from '../../api/historias.js';
import { Meteor } from 'meteor/meteor';

class Resultado extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nombre: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.guardarHistoria(this.state.nombre);
    this.setState({
      nombre: ''
    });
  }

  render() {
    return (
      <div>
        {!this.props.resultado.nombre?
          <div className="row">
            <div className="col-md-12">
              <h2 className="title text-center sinSolucion">Actualmente no contamos con una solución a tu problema, si lo deseas, puedes volver a una pregunta anterior y elegir una respuesta diferente.</h2>
            </div>
          </div>:
          <div>
            <div className="row">
              <div className="col-md-12">
                <h2 className="title text-center">Para solucionar tu duda o problema puedes ir a: </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h2 className="title text-center">{this.props.resultado.nombre}</h2>
                <img className="center" src={this.props.resultado.imagen} width="400px" height="200px" alt="Logo o ubicacion del lugar resultado" />
              </div>
            </div>
            <div className="row pad">
              <h4>Ubicación:</h4> <p>{this.props.resultado.ubicacion}</p>
              <h4>Horario de atención:</h4> <p>{this.props.resultado.horario}</p>
            </div>
            <br />
            <br />
            {this.props.currentUser ?
              <div className="row pad">
                <div className="col-md-6">
                  <p> Puedes guardar el resultado y todo el camino hacia el, cómo una historia, para consultar despues: </p>
                  <form id="userRegisterForm" onSubmit={this.handleSubmit}>
                    <label>Nombre</label>
                    <input type="text" value={this.state.nombre} onChange={this.handleInputChange} name="nombre" className="form-control" placeholder="Nombre de la historia" required />
                    <br/>
                    <button type="submit" className="btn btn-cta-primary">Guardar Resultado</button>
                  </form>
                </div>
              </div>: ''
            }
          </div>
        }
      </div>
    )
  }
}

export default Resultado;
/*
Meteor.subscribe('respuestas');
Meteor.subscribe('preguntas');
Meteor.subscribe('resultados');*/
