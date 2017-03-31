import { Meteor } from 'meteor/meteor';
import '../imports/api/preguntas.js'
import '../imports/api/respuestas.js'
import '../imports/api/resultados.js'
import '../imports/api/historias.js'
Meteor.startup(() => {
  // code to run on server at startup

  //Aca está la otra opción que les comenté
  //agregar esto para que cumpla con el requisito de accesibilidad de lenguaje
   WebApp.addHtmlAttributeHook(function() {
      return {
          "lang": "es"
      }
  })
});
