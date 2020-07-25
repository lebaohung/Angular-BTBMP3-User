import {Category} from './category';
import {Users} from './users';

export interface Song {
  id: number;
  name: string;
  category: Category;
  user: Users;
  likes: number;
  views: number;
  creat_date: string;
  song_image: string;
  status: number;
  description?: string;
  song_link: string;
  song_author: string;
}
