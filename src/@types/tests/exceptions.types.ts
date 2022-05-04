import { HttpException } from '@nestjs/common';

export type equalToRes = {
  data: { [key: string]: any };
  status: number;
  omit: string[];
};
export type equalToError = HttpException;

export type equalToType = equalToRes | equalToError;
