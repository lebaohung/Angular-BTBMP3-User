import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Users} from '../model/users';
import {Observable} from 'rxjs';
import {UserLogin} from '../model/user-login';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API_REGISTRATION_USER = 'http://localhost:8080/registration';
  private readonly API_LOGIN_GET_JWT = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  registration(user: any): Observable<Users>{
    return this.http.post<Users>(this.API_REGISTRATION_USER, user);
  }

  login(user: UserLogin): Observable<any>{
    return this.http.post(this.API_LOGIN_GET_JWT, user);
  }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>('http://localhost:8080/users/showList');
  }
}
