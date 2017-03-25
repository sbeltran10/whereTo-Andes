import React, {Component} from 'react';
import axios from 'axios';

class Registro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      correo: '',
      clave: ''
    };
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
    axios.post(this.props.url + "/usuarios", this.state).then( response => {
        alert("Tu cuenta se ha creado de forma exitosa");
        $('html,body').animate({
        scrollTop: $("#login").offset().top},
        'slow');
        this.setState({
          nombre: '',
          correo: '',
          clave: '',
        });
        this.props.cambiarEstadoLogueado(response.data._id);
        $('#registrate').hide();
    })
  }

  render() {
    return (
      <div>
        <form id="userRegisterForm" onSubmit={this.handleSubmit}>
          <div className="modal-header">
    				<h4 className="modal-title">Crea una cuenta</h4>
    			</div>
          <div className="modal-body">
    				<div className="form-group">
    					<label>Nombre</label>
    					<input type="text" name="nombre" value={this.state.nombre} onChange={this.handleInputChange} className="form-control"  placeholder="Nombre" required />
    				</div>
    				<div className="form-group">
    					<label>Correo</label>
    					<input type="email" name="correo" value={this.state.correo} onChange={this.handleInputChange} className="form-control"  placeholder="Email" required/>
    				</div>
    				<div className="form-group">
    					<label>Contraseña</label>
    					<input type="password" name="clave" value={this.state.clave} onChange={this.handleInputChange}  className="form-control" placeholder="Clave" required/>
    				</div>
    			</div>
    			<div className="modal-footer">
    				<span className="user-login-modal-link pull-left">
    					<a data-rel="loginModal" href="#login">¿Ya tienes una cuenta?</a>
    				</span>
    				<button type="submit" className="btn btn-default btn-outline">Registrate</button>
    			</div>
				</form>
      </div>
    )
  }
}

export default Registro;
