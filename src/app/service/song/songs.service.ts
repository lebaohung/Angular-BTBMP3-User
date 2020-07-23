import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Song} from '../../model/song';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private readonly API_URL = 'http://localhost:8080/song';
  shouldRefresh = new Subject<any>();
  constructor(private httpClient: HttpClient) { }
  create(song: Song, singerId: number): Observable<Song>{
    return this.httpClient.post<Song>(this.API_URL + '/' + singerId , song);
  }
  update(song: Song): Observable<Song>{
    return this.httpClient.put<Song>(this.API_URL + '/' + song.id, song);
  }
}
