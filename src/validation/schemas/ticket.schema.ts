import * as Joi from 'joi';
import { State } from '@prisma/client';
import { joiValidateEnums } from '../helpers/customValidators';

const joiCreateTicket = {
  trainId: Joi.string(),
  carriageId: Joi.string(),
  startStationId: Joi.string(),
  endStationId: Joi.string(),
  seat: Joi.number().greater(0).less(41),
};

export const createTicketSchema = Joi.object(joiCreateTicket).options({
  presence: 'required',
});

export const createTicketByManagerSchema = Joi.object({
  ...joiCreateTicket,
  userId: Joi.string(),
  state: Joi.string().custom(joiValidateEnums(Object.keys(State))),
}).options({});
