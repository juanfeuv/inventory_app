import { Meteor } from 'meteor/meteor';

const getUserInfo = () => {
  return {
    status: true,
    code: 200,
    user: Meteor.user(),
  }
};

Meteor.methods({ getUserInfo });