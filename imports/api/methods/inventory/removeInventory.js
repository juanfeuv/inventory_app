import { Meteor } from 'meteor/meteor';

import Inventory from '../../collections/inventory';

const removeInventory = ({ _id }) => {
  Inventory.remove({ _id });

  return {
    status: true,
    code: 200,
  };
};

Meteor.methods({ removeInventory });