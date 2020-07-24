import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly API_URL = 'http://localhost:8080/api/category';
  constructor(private httpClient: HttpClient) { }
  getAllCategory(): Observable<any>{
    return this.httpClient.get(this.API_URL);
  }
}
