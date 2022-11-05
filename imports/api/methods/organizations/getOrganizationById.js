import { Meteor } from 'meteor/meteor';

import Organizations from '../../collections/organizations';

const getOrganizationById = ({ _id }) => {
  const org = Organizations.findOne({ _id });

  return {
    status: true,
    code: 200,
    org,
  };
};

Meteor.methods({ getOrganizationById });