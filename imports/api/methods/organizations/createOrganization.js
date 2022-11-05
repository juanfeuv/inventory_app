import Joi from 'joi';

import { Meteor } from 'meteor/meteor';

import Organizations from '../../collections/organizations';

const schema = Joi.object({
  name: Joi
    .string()
    .min(1)
    .max(30)
    .required(),
  address: Joi
    .string()
    .min(1)
    .required(),
  nit: Joi
    .string()
    .length(9)
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

/**
 * Function for creating a new organization
 * @param {Object} form
 * @param {String} form.name Name of the organization
 * @param {String} form.address Address of the organization
 * @param {String} form.nit NIT of the organization
 * @param {String} form.tel Cellphone of the organization
 * @returns {Object}
 */
const createOrganization = (form) => {
  const { error } = validate(form);

  if (error) {
    throw new Meteor.Error(error.message);
  }

  const org = Organizations.findOne({ nit: form.nit });

  if (org) {
    throw new Meteor.Error('Organization NIT already exists!');
  }

  const currentDate = new Date();

  Organizations.insert({
    ...form,
    createdAt: currentDate,
    updatedAt: currentDate,
  });

  return {
    status: true,
    code: 200,
  };
};

Meteor.methods({ createOrganization });
