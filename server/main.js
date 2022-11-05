import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import '../imports/api/methods';


Meteor.startup(async () => {
  // build user admin
  Accounts.createUser({
    username: 'admin',
    password: 'admin12345',
    profile: {
      isAdmin: true,
    },
  });

  // build user visitor
  Accounts.createUser({
    username: 'visitor',
    password: 'visitor12345',
    profile: {
      isAdmin: false,
    },
  });
});