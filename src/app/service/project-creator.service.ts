import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Project} from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectCreatorService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getUsersProjects(userId: string): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.apiUrl}/projects/getMyProjects/${userId}`);
  }
}
