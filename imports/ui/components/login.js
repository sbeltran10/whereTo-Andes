import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: '',
      clave: ''
    };
    if(this.props.estaLogueado) {
      $('#login').hide();
      $('#registrate').hide();
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
    axios.post(this.props.url + "/usuarios/login", this.state).then( response => {
        this.setState({
          correo: '',
          clave: ''
        });
        $('#login').hide();
        $('#registrate').hide();
        this.props.cambiarEstadoLogueado(response.data._id);
    })
  }

  render() {
    return (<div>
      <form id="userloginForm" onSubmit={this.handleSubmit}>
						<div className="modal-header">
							<h4 className="modal-title">Login</h4>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<label>Correo</label>
								<input type="email" value={this.state.correo} onChange={this.handleInputChange} name="correo" className="form-control" placeholder="Email" required/>
							</div>
							<div className="form-group">
								<label>Contraseña</label>
								<input type="password" value={this.state.clave} onChange={this.handleInputChange} name="clave" className="form-control" placeholder="Password" required/>
							</div>
						</div>
						<div className="modal-footer">
							<span className="user-login-modal-register pull-left">
								<a data-rel="registerModal" href="#registrate">¿No eres un miembro todavía?</a>
							</span>
							<button type="submit" className="btn btn-default btn-outline">Ingresa</button>
						</div>
					</form>
    </div>)
  }
}

export default Login;
