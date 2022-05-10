import * as Joi from 'joi';
import { Role } from '@prisma/client';
import { joiValidateEnums } from '../helpers/customValidators';
import { regexEnglishAlphabet, regexPassword } from '../helpers/regexes';

const joiEmail = {
  email: Joi.string().email(),
};

const joiPassword = {
  password: Joi.string().pattern(regexPassword),
};

export const loginUserSchema = Joi.object({
  ...joiEmail,
  ...joiPassword,
}).options({ presence: 'required' });

export const joiNameSurname = {
  name: Joi.string().pattern(regexEnglishAlphabet),
  surname: Joi.string().pattern(regexEnglishAlphabet),
};

const joiCreateUser = {
  ...joiNameSurname,
  ...joiPassword,
  ...joiEmail,
  passwordRepetition: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .label('password repetition')
    .messages({
      'any.only': 'Passwords must match',
    }),
};
export const createUserSchema = Joi.object(joiCreateUser).options({
  presence: 'required',
});

export const createUserByAdminSchema = Joi.object({
  ...joiCreateUser,
  role: Joi.string().custom(joiValidateEnums(Object.keys(Role))),
}).options({ presence: 'required' });
