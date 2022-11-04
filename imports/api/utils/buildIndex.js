import _ from 'lodash';

import { Mongo } from 'meteor/mongo';

/**
 * Function for create a collectino index
 * @param {Mongo.Collection} colletion
 * @param {Object} index
 * @returns {void} 
 */
const buildIndex = (colletion, index) => {
  const { index: rawIndex, options } = index;

  if (!_.isEmpty(options)) {
    colletion.createIndex(rawIndex, options);

    return;
  }

  colletion.createIndex(rawIndex);
};

export default buildIndex;
