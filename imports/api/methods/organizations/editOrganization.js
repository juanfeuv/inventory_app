import Joi from 'joi';

import { Meteor } from 'meteor/meteor';

import Organizations from '../../collections/organizations';

const schema = Joi.object({
  _id: Joi
    .string()
    .required(),
  name: Joi
    .string()
    .min(1)
    .max(30)
    .required(),
  address: Joi
    .string()
    .min(1)
    .required(),
  tel: Joi
    .string()
    .length(10)
    .required(),
});

export const validate = (form) => {
  const { error } = schema.validate(form);

  return {
    error,
  }
};

const editOrganization = (form) => {
  const { error } = validate(form);

  if (error) {
    throw new Meteor.Error(error.message);
  }

  const { _id, ...rest } = form

  const currentDate = new Date();

  Organizations.update({
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

Meteor.methods({ editOrganization });
