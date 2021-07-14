import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../model/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host = environment.apiUrl;
  private token!: string;
  private loggedInUsername!: string;
  private jwtHelper = new JwtHelperService();


  constructor(private http: HttpClient) {
  }

  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>
    (`${this.host}/user/login`, user, {observe: 'response'});
  }

  public register(formData: FormData): Observable<User> {
    return this.http.post<User>
    (`${this.host}/user/register`, formData);
  }

  public logOut(): void {
    this.token = null as any;
    this.loggedInUsername = null as any;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    return JSON.parse((localStorage.getItem('user') as string));
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token') as string;
  }

  public getToken(): string {
    return this.token;
  }

  public isAnAdmin(): boolean {
    const user: User = this.getUserFromLocalCache();
    if (user.role === 'ROLE_ADMIN') {
      return true;
    }
    return false;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') { // sub is username
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
    return false;
  }
}
