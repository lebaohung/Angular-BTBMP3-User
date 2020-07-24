import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SingerService {
  private readonly API_URL = '10.30.0.90:8080/api/singer';
  shouldRefresh = new Subject<any>();
  constructor(private httpClient: HttpClient) {
  }
  getAllSinger(): Observable<any>{
     return this.httpClient.get(this.API_URL);
   }
  getSingerById(id: number): Observable<any>{
    return this.httpClient.get(this.API_URL + '/' + id);
  }
}
