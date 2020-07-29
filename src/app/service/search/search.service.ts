import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly API_URL = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }

  getSongByName(name: string): Observable<any>{
    return this.httpClient.get(this.API_URL + '/api/song/findsong/' + name);
  }

  getSingerByName(name: string): Observable<any>{
    return this.httpClient.get(this.API_URL + '/api/singer/findsinger/' + name);
  }

  getPlaylistByName(name: string): Observable<any>{
    return this.httpClient.get(this.API_URL + '/playlist/findplaylist/' + name);
  }
}
