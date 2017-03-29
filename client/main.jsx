import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/ui/components/App.jsx';
import '../imports/startup/accounts-config.js';
import '../imports/assets/css/styles.css'
import '../imports/assets/plugins/bootstrap/css/bootstrap.min.css'
import '../imports/assets/plugins/font-awesome/css/font-awesome.css'
import '../imports/assets/plugins/prism/prism.css'
import '../imports/assets/plugins/jquery-1.11.3.min.js'
import '../imports/assets/plugins/jquery.easing.1.3.js'
import '../imports/assets/plugins/bootstrap/js/bootstrap.min.js'
import '../imports/assets/plugins/jquery-scrollTo/jquery.scrollTo.min.js'
import '../imports/assets/plugins/prism/prism.js'
import '../imports/assets/js/main.js'

//En general me parece que la aplicación esta muy bien, más aun cuando tiene
//un impacto positivo en el contexto de la universidad

//Esta saliendo en consola del navegador un warning: setState(...): Can only update
// a mounted or mounting component. This usually means you called setState() on an
// unmounted component. This is a no-op. Please check the code for the App component.
// Aunque no se si sea algo propio de mi instalación (uso windows...)

//Mientras veia las preguntas para algunos tipos
//de problemas o dudas que no tiene como tal preguntas no hace el cambio de quitar los tipos de preguntas
//por lo que se genera un error
//( Uncaught TypeError: Cannot read property 'contenido' of undefined
// at App.cargarRespuesta  App.jsx 89)
//si se vuelve a seleccionar algun elemento de dicha lista
//Tal vez una opción pueda ser mostrar un mensaje diciendo que no hay preguntas asociadas al tema por ahora
// o algo por el estilo(?)

Meteor.startup(() => {
  $('html').attr('lang', 'es');
  render(<App />, document.getElementById('render-target'));
});
