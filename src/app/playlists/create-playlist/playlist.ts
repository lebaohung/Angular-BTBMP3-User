import {Users} from '../../model/users';

export interface Iplaylist {
  id: number;
  name: string;
  views: number;
  likes: number;
  image: string;
  create_date: string;
  user: Users;
}
