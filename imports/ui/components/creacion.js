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

	limpiarCampos() {
		this.setState({
			nombreRespuesta: '',
			hijo: 'pregunta',
			preguntaHijoContenido: '',
			resultadoHijoNombre: '',
			resultadoHijoUbicacion: '',
			resultadoHijoImagen: '',
			resultadoHijoComoLlegar: '',
			resultadoHijoHorario: ''
		})
	}

	handleInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(event);
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
						resultadosHijo: []
					}, function (error, result) {
						if (error)
							console.log(error);
						else {
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
						resultadosHijo: [result]
					}, function (error, result) {
						if (error)
							console.log(error);
						else {
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
		this.props.confirmarCreacion(this.state.nombreRespuesta);
		this.limpiarCampos();
		$('html,body').animate({
			scrollTop: $("#dinamico").offset().top
		},
			'slow');
	}

	render() {
		return (
			<div className="creacion-datos-respuesta">
				<form id="respuestaRegisterForm" onSubmit={this.handleSubmit}>
					<div className="modal-header">
						<h4 className="modal-title">Crea una nueva respuesta</h4>
					</div>
					<div className="modal-body">
						<div className="form-group">
							<label>Datos de la respuesta</label>
							<input type="text" name="nombreRespuesta" value={this.state.nombreRespuesta} onChange={this.handleInputChange} className="form-control" placeholder="Respuesta nueva" required aria-label="Introduce la descripcion de la respuesta" />
						</div>
						<div>
							<div className="form-group">
								<label>¿A qué conduce la respuesta?</label><br />
								<input type="radio" name="hijo" value="pregunta" checked={this.state.hijo === 'pregunta'} onChange={this.handleInputChange} aria-label="Radio pregunta" /> Pregunta<br />
								<input type="radio" name="hijo" value="resultado" checked={this.state.hijo === 'resultado'} onChange={this.handleInputChange} aria-label="Radio resultado" /> Resultado<br />
							</div>
						</div>
						{this.state.hijo === 'pregunta' ?
							<div className="form-group">
								<label>Datos de la pregunta</label>
								<input type="text" name="preguntaHijoContenido" value={this.state.preguntaHijoContenido} onChange={this.handleInputChange} className="form-control" placeholder="Pregunta nueva" required aria-label="Introduce la descripcion de la nueva pregunta" />
							</div> :
							<div className="form-group">
								<label>Datos del resultado</label>
								<input type="text" name="resultadoHijoNombre" value={this.state.resultadoHijoNombre} onChange={this.handleInputChange} className="form-control" placeholder="Nombre del lugar" required aria-label="Introduce el nombre del lugar del resultado" /><br />
								<input type="text" name="resultadoHijoUbicacion" value={this.state.resultadoHijoUbicacion} onChange={this.handleInputChange} className="form-control" placeholder="Ubicación del lugar" aria-label="Introduce la ubicacion del lugar" /><br />
								<input type="text" name="resultadoHijoImagen" value={this.state.resultadoHijoImagen} onChange={this.handleInputChange} className="form-control" placeholder="Imagen" aria-label="Introduce la imagen" /><br />
								<input type="text" name="resultadoHijoComoLlegar" value={this.state.resultadoHijoComoLlegar} onChange={this.handleInputChange} className="form-control" placeholder="Indicaciones de como llegar" aria-label="Introduce las instrucciones de como llegar" /><br />
								<input type="text" name="resultadoHijoHorario" value={this.state.resultadoHijoHorario} onChange={this.handleInputChange} className="form-control" placeholder="horario de atención" aria-label="Introduce el horario de atencion" />
							</div>
						}
					</div>
					<div className="modal-footer agregar-respuesta">
						<button type="submit" href="#preguntas" className="btn btn-info btn-lg botones-creacion"><b>Crear respuesta</b></button>
						<a className="btn btn-info btn-lg btn-cancelar-creacion botones-creacion" href="#preguntas" onClick={() => this.props.cancelarCreacion()}>
							Cancelar
            </a>
					</div>
				</form>
			</div>
		)
	}
}

export default Creacion;
