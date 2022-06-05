import { Position } from '@prisma/client';
import { joiNameSurname } from './user.schema';
import { joiValidateEnums } from '../helpers/customValidators';
import { requestDateFormat } from '../../config/dates.config';
import { regexEnglishAlphabet } from '../helpers/regexes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Joi = require('joi').extend(require('@joi/date'));

export const updateEmployeeSchema = Joi.object({
  name: Joi.string().pattern(regexEnglishAlphabet),
  surname: Joi.string().pattern(regexEnglishAlphabet),
  dateOfBirth: Joi.date().format(requestDateFormat),
  address: Joi.string().min(2).max(128),
  telephoneNumber: Joi.string().alphanum().min(6).max(32),
  position: Joi.string().custom(joiValidateEnums(Object.keys(Position))),
});

export const createEmployeeSchema = Joi.object({
  ...joiNameSurname,
  dateOfBirth: Joi.date().format(requestDateFormat).required(),
  address: Joi.string().min(2).max(128).required(),
  telephoneNumber: Joi.string().alphanum().min(6).max(32).required(),
  position: Joi.string()
    .custom(joiValidateEnums(Object.keys(Position)))
    .required(),
  file: Joi.string().allow('').optional(),
});
