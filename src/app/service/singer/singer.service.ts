import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Song} from '../../model/song';
import {Singer} from '../../model/singer';

@Injectable({
  providedIn: 'root'
})
export class SingerService {
  private readonly API_URL = 'http://localhost:8080/api/singer';
  shouldRefresh = new Subject<any>();
  constructor(private httpClient: HttpClient) {
  }
  getAllSinger(): Observable<any>{
     return this.httpClient.get(this.API_URL);
   }
  getSingerById(id: number): Observable<any>{
    return this.httpClient.get(this.API_URL + '/' + id);
  }

  create(singer: Singer): Observable<Singer>{
    return this.httpClient.post<Singer>(this.API_URL + '/save', singer);
  }

  playSong(id: number): Observable<any> {
    return this.httpClient.get(this.API_URL + '/listSong/' + id);
  }
}
