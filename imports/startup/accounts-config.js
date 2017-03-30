import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

//Super que usen accounts.ui, facilita mucho las cosas :)
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

if (Meteor.isServer) {
  Accounts.onCreateUser(function (options, user) {
    // Me gusta mucho que manejen roles, pensando desde ya en la seguridad ;) 
    user.role = 'user';
    // Se mantiene el comportamiento por defecto de login.
    if (options.profile)
      user.profile = options.profile;
    return user;
  });
}
