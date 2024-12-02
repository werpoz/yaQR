import { Email } from '../value-objects/emai.vo';

export class User {
  constructor(
    public readonly name: string,
    public readonly email: Email,
  ) {}
}
