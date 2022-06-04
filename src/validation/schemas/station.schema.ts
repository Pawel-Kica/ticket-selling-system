import * as Joi from 'joi';

export const createStationSchema = Joi.object({
  name: Joi.string().min(2).max(64),
});
