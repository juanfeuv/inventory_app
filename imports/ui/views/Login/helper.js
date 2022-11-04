import Joi from 'joi';

const schema = Joi.object({
  username: Joi
    .string()
    .alphanum()
    .min(1)
    .max(30)
    .required(),
  password: Joi
    .string()
    .min(1),
});

export const validate = ({ username, password, }) => {
  const { error } = schema.validate({
    username, password,
  });

  return {
    error,
  }
};