import * as moment from 'moment';
import { BadRequestException } from '@nestjs/common';
import { requestDateFormat } from '../../config/dates.config';

export function ToNumber(value: string): number | undefined {
  const newValue = Number(value);
  if (isNaN(newValue)) return undefined;
  return newValue;
}

export function toISOstring(value: string) {
  return moment(value, requestDateFormat).toISOString() ?? undefined;
}

export function ValidateQueryEnums(value: string, enums: string[]): string {
  if (!enums.includes(value)) throw new BadRequestException();
  return value;
}
