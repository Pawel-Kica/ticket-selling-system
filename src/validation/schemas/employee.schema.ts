import * as Joi from 'joi';
import { Position } from '@prisma/client';
import { joiNameSurname } from './user.schema';
import { joiValidateEnums } from '../helpers/customValidators';

export const createEmployeeSchema = Joi.object({
  ...joiNameSurname,
  dateOfBirth: Joi.date().less(Date.now()).required(),
  address: Joi.string().min(2).max(128).required(),
  telephoneNumber: Joi.string().alphanum().min(6).max(32).required(),
  position: Joi.string()
    .custom(joiValidateEnums(Object.keys(Position)))
    .required(),
  file: Joi.string().allow('').optional(),
});
