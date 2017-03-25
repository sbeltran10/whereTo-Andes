import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

if (Meteor.isServer) {
  Accounts.onCreateUser(function (options, user) {
    user.role = 'user';
    // Se mantiene el comportamiento por defecto de login.
    if (options.profile)
      user.profile = options.profile;
    return user;
  });
}