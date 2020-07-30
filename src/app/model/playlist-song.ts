import {Iplaylist} from '../playlists/create-playlist/playlist';
import {Song} from './song';

export interface PlaylistSong {
  id: number;
  playlistID: Iplaylist;
  songID: Song;
}
