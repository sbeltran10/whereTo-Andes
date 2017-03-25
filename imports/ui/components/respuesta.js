import React, {Component} from 'react';

class Respuesta extends Component {

  render() {
    return(
      <div className="col-md-4 boton">
      <a className="btn btn-info btn-lg" onClick={() => this.props.cargarRespuesta(this.props.respuesta._id,this.props.pregunta,this.props.idPregunta)}>
        {this.props.respuesta.contenido}
      </a>
    </div>
    )
  }
}

export default Respuesta;
