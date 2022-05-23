import { ObjectSchema } from 'joi';
import { PipeTransform, Injectable } from '@nestjs/common';
import createBetterJoiErrors from './helpers/betterJoiError';
import { InvalidRequestedBody } from '../utils/responses/errors';

export const validateSchema = (
  schema: ObjectSchema,
  dataToValidate: any,
): any => {
  const { error } = schema.validate(dataToValidate, { abortEarly: false });
  if (error) return createBetterJoiErrors(error);
  return true;
};
export const ApplyValidation = (schema: ObjectSchema) =>
  new JoiValidationPipe(schema);

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: any) {
    const result = validateSchema(this.schema, value);
    if (result !== true) throw new InvalidRequestedBody(result);
    return value;
  }
}
