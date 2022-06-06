export const SuccessResponse = {
  statusCode: 200,
  message: 'Ok',
};

export class SuccessResponseDto {
  statusCode = 200;
  message = 'Ok';
}
export class TokenResponseDto {
  token: string;
}
