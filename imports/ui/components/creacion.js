import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Preguntas } from '../../api/preguntas.js'
import { Respuestas } from '../../api/respuestas.js'
import { Resultados } from '../../api/resultados.js'

class Creacion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nombreRespuesta: '',
			hijo: 'pregunta',
			preguntaHijoContenido: '',
			resultadoHijoNombre: '',
			resultadoHijoUbicacion: '',
			resultadoHijoImagen: '',
			resultadoHijoComoLlegar: '',
			resultadoHijoHorario: ''
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
		console.log(this.state.hijo);
		var descripcionRespuesta = this.state.nombreRespuesta;
		var idPregunta = this.props.idPregunta;
		if (this.state.hijo === 'pregunta') {
			Meteor.call('preguntas.insert', {
				contenido: this.state.preguntaHijoContenido,
				respuestasHijo: []
			}, function (error, result) {
				if (error)
					console.log(error);
				else {
					Meteor.call('respuestas.insert', {
						contenido: descripcionRespuesta,
						simbolo: "",
						preguntasHijo: [result],
						resultasdoHijo: []
					}, function (error, result) {
						if (error)
							console.log(error);
						else {
							console.log(idPregunta);
							Meteor.call('preguntas.insertRespuesta',
								idPregunta, result, function (error, result) {
									if (error)
										console.log(error);
									else
										console.log(result);
								})
						}
					});
				}
			});
		}
		else {
			hijoId = Meteor.call('resultados.insert', {
				nombre: this.state.resultadoHijoNombre,
				ubicacion: this.state.resultadoHijoUbicacion,
				imagen: this.state.resultadoHijoImagen,
				comoLlegar: this.state.resultadoHijoComoLlegar,
				horario: this.state.resultadoHijoHorario,
			}, function (error, result) {
				if (error)
					console.log(error);
				else {
					Meteor.call('respuestas.insert', {
						contenido: descripcionRespuesta,
						simbolo: "",
						preguntasHijo: [],
						resultasdoHijo: [hijoId]
					}, function (error, result) {
						if (error)
							console.log(error);
						else {
							Meteor.call('preguntas.insertRespuesta',
								estado.preguntaId, result, function (error, result) {
									if (error)
										console.log(error);
									else
										console.log(result);
								})
						}
					});
				}
			});

		}
	}

	render() {
		return (
			<div>
				<form id="respuestaRegisterForm" onSubmit={this.handleSubmit}>
					<div className="modal-header">
						<h4 className="modal-title">Crea una nueva respuesta</h4>
					</div>
					<div className="modal-body">
						<div className="form-group">
							<label>Datos de la respuesta</label>
							<input type="text" name="nombreRespuesta" value={this.state.nombreRespuesta} onChange={this.handleInputChange} className="form-control" placeholder="Respuesta nueva" required />
						</div>
						<div>
							<div className="form-group">
								<label>¿A qué conduce la respuesta?</label><br />
								<input type="radio" name="hijo" value="pregunta" checked={this.state.hijo === 'pregunta'} onChange={this.handleInputChange} /> Pregunta<br />
								<input type="radio" name="hijo" value="resultado" checked={this.state.hijo === 'resultado'} onChange={this.handleInputChange} /> Resultado<br />
							</div>
						</div>
						{this.state.hijo === 'pregunta' ?
							<div className="form-group">
								<label>Datos de la pregunta</label>
								<input type="text" name="preguntaHijoContenido" value={this.state.preguntaHijoContenido} onChange={this.handleInputChange} className="form-control" placeholder="Pregunta nueva" required />
							</div> :
							<div className="form-group">
								<label>Datos del resultado</label>
								<input type="text" name="resultadoHijoNombre" value={this.state.resultadoHijoNombre} onChange={this.handleInputChange} className="form-control" placeholder="Nombre del lugar" required /><br />
								<input type="text" name="resultadoHijoUbicacion" value={this.state.resultadoHijoUbicacion} onChange={this.handleInputChange} className="form-control" placeholder="Ubicación del lugar" /><br />
								<input type="text" name="resultadoHijoImagen" value={this.state.resultadoHijoImagen} onChange={this.handleInputChange} className="form-control" placeholder="Imagen" /><br />
								<input type="text" name="resultadoHijoComoLlegar" value={this.state.resultadoHijoComoLlegar} onChange={this.handleInputChange} className="form-control" placeholder="Indicaciones de como llegar" /><br />
								<input type="text" name="resultadoHijoHorario" value={this.state.resultadoHijoHorario} onChange={this.handleInputChange} className="form-control" placeholder="horario de atención" />
							</div>
						}
					</div>
					<div className="modal-footer">
						<button type="submit" className="btn btn-default btn-outline">Crear respuesta</button>
					</div>
				</form>
			</div>
		)
	}
}

export default Creacion;
