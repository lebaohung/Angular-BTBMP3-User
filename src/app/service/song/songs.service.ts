import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Song} from '../../model/song';
import {Observable, Subject} from 'rxjs';
import {Iplaylist} from '../../playlists/create-playlist/playlist';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private readonly API_URL = 'http://localhost:8080/api/song';
  shouldRefresh = new Subject<any>();
  constructor(private httpClient: HttpClient) { }
  create(song: Song, singerId: string): Observable<Song>{
    return this.httpClient.post<Song>(this.API_URL + '/' + singerId , song);
  }
  update(song: Song, singerId: number): Observable<Song>{
    return this.httpClient.put<Song>(this.API_URL + '/edit/' + singerId , song
    );
  }

  deleteSong(id: number): Observable<any>{
    return this.httpClient.delete(this.API_URL + '/' + id );
  }

  getSongById(id: number): Observable<any>{
    return this.httpClient.get(this.API_URL + '/' + id);
  }

  getSingerOfThisSong(id: number): Observable<any>{
    return this.httpClient.get(this.API_URL + '/singerandsong/' + id);
  }

  getTopView(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(this.API_URL + '/topview');
  }

  getTopDate(): Observable<Song[]> {
      return this.httpClient.get<Song[]>(this.API_URL + '/newcreat');
  }

  getTopLiked(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(this.API_URL + '/topliked');
  }

  getSongByUser(id: number): Observable<Song[]> {
    return this.httpClient.get<Song[]>(this.API_URL + '/user/' + id);
  }

  getConment(id: number): Observable<any> {
    return  this.httpClient.get(this.API_URL + '/showcomment/' + id);
  }
}
