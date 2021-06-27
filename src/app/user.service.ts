import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiserviceUrl = ''; // localhost with environment.apiBaseUrl

  constructor(private hhtp: HttpClient) { }

  public loginUser(user: User): Observable<User>{
    // TODO: /login/User or /find/$username&$password
    return this.hhtp.post<User>(`${this.apiserviceUrl}/find/`, user);
  }

  public registerUser(user: User): Observable<User>{
    return this.hhtp.post<User>(`${this.apiserviceUrl}/add/`, user);
  }

}
