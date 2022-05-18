export const SuccessResponse = { success: true };

export class SuccessResponseDto {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  success: boolean = true;
}

export class TokenResponseDto {
  token: string;
}
