import React, {Component} from 'react';

class Historia extends Component {

  render() {
    return(
      <div className="col-md-6 boton">
      <a className="btn btn-info btn-lg" onClick={() => this.props.cargarHistoria(this.props.historia._id)}>
        {this.props.historia.nombre}
      </a>
    </div>
    )
  }
}

export default Historia;
