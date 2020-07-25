import {Category} from './category';
import {Users} from './users';

export interface Song {
  id: number;
  name: string;
  category: Category;
  user: Users;
  likes: number;
  views: number;
  creatDate: string;
  songImage: string;
  status: number;
  description: string;
  songLink: string;
  songAuthor: string;
}
