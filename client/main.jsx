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

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
