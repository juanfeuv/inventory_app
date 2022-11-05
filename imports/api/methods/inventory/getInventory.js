import { Meteor } from 'meteor/meteor';

import Inventory from '../../collections/inventory';

const getInventory = ({
  organizationId
}) => {
  const list = Inventory
    .find({ organizationId }, {
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

Meteor.methods({ getInventory });