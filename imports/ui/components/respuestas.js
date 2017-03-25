import React, {Component} from 'react';
import Respuesta from './respuesta';

class Respuestas extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.respuestas) {
      return(
        <div>
          {this.props.respuestas.map((respuesta, index) => {
              return <Respuesta key={index} respuesta={respuesta} idPregunta={this.props.idPregunta} pregunta={this.props.pregunta} cargarRespuesta={this.props.cargarRespuesta.bind(this)}/>
          })}
        </div>
      )
    }
    else {
      return(
        <div></div>
      )
    }

  }
}

export default Respuestas;
