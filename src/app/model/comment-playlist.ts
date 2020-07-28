import {Users} from './users';
import {Iplaylist} from '../playlists/create-playlist/playlist';


export interface ICommentPlaylist {
  id: number;
  content: string;
  date: Date;
  user: Users;
  playlist: Iplaylist;
}
