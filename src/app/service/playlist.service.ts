import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Iplaylist} from '../playlists/create-playlist/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private readonly API_URL = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any>{
    return this.httpClient.get(this.API_URL);
  }

  getById(id: number): Observable<any>{
    return this.httpClient.get(this.API_URL + '/' + id);
  }

  create(playlist: Iplaylist): Observable<Iplaylist>{
    return this.httpClient.post<Iplaylist>(this.API_URL, playlist);
  }

  update(playlist: Iplaylist): Observable<Iplaylist>{
    return this.httpClient.put<Iplaylist>(this.API_URL + '/' + playlist.id, playlist);
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.API_URL + '/' + id);
  }
}
