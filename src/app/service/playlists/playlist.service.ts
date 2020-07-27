import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Iplaylist} from '../../playlists/create-playlist/playlist';
import {Song} from '../../model/song';
import {ICommentPlaylist} from '../../model/comment-playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private httpClient: HttpClient) {
  }

  private readonly API_URL = 'http://localhost:8080/playlist';
  shouldRefresh = new Subject<any>();

  getIdUser(id: number): Observable<any> {
    return this.httpClient.get(this.API_URL + '/listUserID/' + id);
  }

  getTopView(): Observable<Iplaylist[]> {
    return this.httpClient.get<Iplaylist[]>(this.API_URL + '/topView');
  }

  getTopLike(): Observable<Iplaylist[]> {
    return this.httpClient.get<Iplaylist[]>(this.API_URL + '/topLike');
  }

  getTopDate(): Observable<Iplaylist[]> {
    return this.httpClient.get<Iplaylist[]>(this.API_URL + '/topDate');
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(this.API_URL + '/list/' + id);
  }

  create(playlist: Iplaylist): Observable<Iplaylist> {
    return this.httpClient.post<Iplaylist>(this.API_URL + '/creates', playlist);
  }

  update(any: any): Observable<any> {
    return this.httpClient.put<any>(this.API_URL + '/edit', any);
  }

  playlistByID(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/edit/' + id);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.API_URL + '/delete/' + id);
  }

  playSong(id: number): Observable<any> {
    return this.httpClient.get(this.API_URL + '/playlistsong/' + id);
  }

  deleteSongPlaylist(id: number): Observable<any> {
    return this.httpClient.delete(this.API_URL + '/deleteSonginPlaylist/' + id);
  }

  addSongInPlaylist(id: number, song: Song): Observable<any> {
    return this.httpClient.put(this.API_URL + '/addsong/' + id, song);
  }

  getConment(id: number): Observable<any> {
    return  this.httpClient.get(this.API_URL + '/showcomment/' + id);
  }

  addComment(comment: ICommentPlaylist): Observable<ICommentPlaylist> {
    return this.httpClient.post<ICommentPlaylist>(this.API_URL + '/savecommentPlaylist/', comment);
  }
}
