import * as Joi from 'joi';

export const createTicketSchema = Joi.object({
  trainId: Joi.string(),
  carriageId: Joi.string(),
  startStationId: Joi.string(),
  endStationId: Joi.string(),
  seat: Joi.number().greater(0).less(41),
}).options({ presence: 'required' });
