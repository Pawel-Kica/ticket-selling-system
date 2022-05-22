import { BadRequestException } from '@nestjs/common';

export function ToNumber(value: string): number | undefined {
  const newValue = Number(value);
  if (isNaN(newValue)) return undefined;
  return newValue;
}

export function ValidateQueryEnums(value: string, enums: string[]): string {
  if (!enums.includes(value)) throw new BadRequestException();
  return value;
}
