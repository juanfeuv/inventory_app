import Joi from 'joi';

import { Meteor } from 'meteor/meteor';

import Inventory from '../../collections/inventory';

const schema = Joi.object({
  _id: Joi
    .string()
    .required(),
  item: Joi
    .string()
    .min(1)
    .max(30)
    .required(),
  quantity: Joi
    .number()
    .min(1)
    .required(),
  price: Joi
    .number()
    .min(1)
    .required(),
});

export const validate = (form) => {
  const { error } = schema.validate(form);

  return {
    error,
  }
};

const editInventory = (form) => {
  const { error } = validate(form);

  if (error) {
    throw new Meteor.Error(error.message);
  }

  const { _id, ...rest } = form

  const currentDate = new Date();

  Inventory.update({
    _id,
  }, {
    $set: {
      ...rest,
      updatedAt: currentDate,
    }
  });

  return {
    status: true,
    code: 200,
  };
};

Meteor.methods({ editInventory });
