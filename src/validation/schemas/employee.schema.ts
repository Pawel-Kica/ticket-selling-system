import { Position } from '@prisma/client';
import { joiNameSurname } from './user.schema';
import { joiValidateEnums } from '../helpers/customValidators';
import { requestDateFormat } from '../../config/dates.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Joi = require('joi').extend(require('@joi/date'));

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
