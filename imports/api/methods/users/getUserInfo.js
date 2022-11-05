import { Meteor } from 'meteor/meteor';

/**
 * Function for obtaining the curret logged user
 * @returns {Object}
 */
const getUserInfo = () => {
  return {
    status: true,
    code: 200,
    user: Meteor.user(),
  }
};

Meteor.methods({ getUserInfo });