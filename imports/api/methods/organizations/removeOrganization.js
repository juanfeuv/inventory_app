import { Meteor } from 'meteor/meteor';

import Organizations from '../../collections/organizations';

const removeOrganization = ({ _id }) => {
  Organizations.remove({ _id });

  return {
    status: true,
    code: 200,
  };
};

Meteor.methods({ removeOrganization });