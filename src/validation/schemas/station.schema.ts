import * as Joi from 'joi';

export const createUpdateStationSchema = Joi.object({
  name: Joi.string().min(2).max(64).required(),
});
