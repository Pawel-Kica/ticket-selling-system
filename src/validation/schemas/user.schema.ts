import * as Joi from 'joi';
import { regexEnglishAlphabet, regexPassword } from '../helpers/regexes';

const joiEmail = {
  email: Joi.string().email(),
};

const joiPassword = {
  password: Joi.string().pattern(regexPassword),
};

export const loginSchema = Joi.object({
  ...joiEmail,
  ...joiPassword,
}).options({ presence: 'required' });

const joiGeneralInfo = {
  name: Joi.string().pattern(regexEnglishAlphabet),
  surname: Joi.string().pattern(regexEnglishAlphabet),
};

export const createUserSchema = Joi.object({
  ...joiGeneralInfo,
  ...joiEmail,
  ...joiPassword,
  passwordRepetition: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .label('password repetition')
    .messages({
      'any.only': 'Passwords must match',
    }),
}).options({ presence: 'required' });
