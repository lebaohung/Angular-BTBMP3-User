import {Users} from './users';
import {Song} from './song';

export interface ICommentSong {

  id: number;
  content: string;
  date: Date;
  user: Users;
  song: Song;
}
