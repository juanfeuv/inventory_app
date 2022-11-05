import { Mongo } from 'meteor/mongo';

import buildIndex from '../utils/buildIndex';

const INDEXES = [
  {
    index: {
      nit: 1,
    },
    options: {
      unique: true,
    }
  }, {
    index: {
      updatedAt: -1,
    }
  }
];

const Organizations = new Mongo.Collection('organizations');

INDEXES.forEach(index => buildIndex(Organizations, index));

export default Organizations;
