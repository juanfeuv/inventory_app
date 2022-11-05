import { Meteor } from 'meteor/meteor';

import Organizations from '../../collections/organizations';

const getOrganizations = () => {
  const list = Organizations
    .find({}, {
      sort: {
        updatedAt: -1,
      }
    })
    .fetch();

  return {
    status: true,
    code: 200,
    list,
  };
};

Meteor.methods({ getOrganizations });


