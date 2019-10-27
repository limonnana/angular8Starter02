import { Role } from './role';

export class Credentials {
  constructor(
    public username: string,
    public token: string,
    public role: Role
  ) {}
}
