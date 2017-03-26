import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Accounts.onCreateUser(function (options, user) {
    user.profile = {role:'user'};
    // Se mantiene el comportamiento por defecto de login.
    if (options.profile)
        user.profile = options.profile;
    return user;
});