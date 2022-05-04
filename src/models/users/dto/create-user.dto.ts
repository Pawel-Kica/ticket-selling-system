export class CreateUserDto {
  readonly name: string;
  readonly surname: string;
  public email: string;
  public password: string;
  readonly dateOfBirth: Date;
}
