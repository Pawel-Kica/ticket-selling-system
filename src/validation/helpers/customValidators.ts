import { CustomHelpers } from 'joi';

export const joiValidateEnums = (enums: string[]) => {
  const joiValidateElement = (value: string, helpers: CustomHelpers) => {
    if (!enums.includes(value)) return helpers.error('any.invalid');
    return value;
  };
  return joiValidateElement;
};
