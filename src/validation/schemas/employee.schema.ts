import * as Joi from 'joi';
import { Position } from '@prisma/client';
import { joiNameSurname } from './user.schema';
import { joiValidateEnums } from '../helpers/customValidators';

export const createEmployeeSchema = Joi.object({
  ...joiNameSurname,
  dateOfBirth: Joi.date().less(Date.now()),
  address: Joi.string(),
  telephoneNumber: Joi.string(),
  position: Joi.string().custom(joiValidateEnums(Object.keys(Position))),
}).options({ presence: 'required' });
