import React, { Component } from 'react';
import Respuesta from './respuesta';

class Respuestas extends Component {

  render() {
    if (this.props.respuestas) {
      return (
        <div>
          {this.props.respuestas.map((respuesta, index) => {
            return <Respuesta prepararRespuestaAEliminar={this.props.prepararRespuestaAEliminar.bind(this)} currentUser={this.props.currentUser} respuestaAEliminar={this.props.respuestaAEliminar} key={index} respuesta={respuesta} idPregunta={this.props.idPregunta} pregunta={this.props.pregunta} cargarRespuesta={this.props.cargarRespuesta.bind(this)} />
          })}
          {(this.props.currentUser && this.props.currentUser.profile.role == 'admin') ?
            <div className="col-md-4 boton agregar-respuesta">
              <a className="btn btn-info btn-lg" onClick={() => this.props.toggleModoCreacion()}>
                + Añadir nueva respuesta
            </a>
            </div> : ''
          }
        </div>
      )
    }
    else {
      return (
        <div></div>
      )
    }

  }
}
export default Respuestas;
