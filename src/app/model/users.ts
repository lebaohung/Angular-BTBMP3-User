import {Role} from './role';

export interface Users {
  username: string;
  email: string;
  password: string;
  roles: Role;
}
