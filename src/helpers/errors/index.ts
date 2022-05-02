export class InvalidCredentials extends Error {
  public readonly code: number = 401;
  public readonly msg: string = 'Invalid credentials';
  constructor() {
    super();
    Object.setPrototypeOf(this, InvalidCredentials.prototype);
  }
}

export class EmailAlreadyExists extends Error {
  public readonly code: number = 400;
  public readonly msg: string = 'EmailAlreadyExists';
  constructor() {
    super();
    Object.setPrototypeOf(this, EmailAlreadyExists.prototype);
  }
}
