import { Mongo } from 'meteor/mongo';

import buildIndex from '../utils/buildIndex';

const INDEXES = [
  {
    index: {
      organizationId: 1,
    },
  }, {
    index: {
      updatedAt: -1,
    }
  }
];

const Inventory = new Mongo.Collection('inventory');

INDEXES.forEach(index => buildIndex(Inventory, index));

export default Inventory;
