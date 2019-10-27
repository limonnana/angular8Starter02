import { Role } from './role';

export class User {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: Role;
  password: string;
  retypePassword: string;
  token: string;
  created: string;
  modified: string;
  updatedAt: Date;
  createdAt: Date;
}
