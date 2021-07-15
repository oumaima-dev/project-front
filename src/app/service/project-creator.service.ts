import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Project} from '../model/project';
import {ProjectCreator} from '../model/projectCreator';

@Injectable({
  providedIn: 'root'
})
export class ProjectCreatorService {

  private apiUrl = environment.api;
  constructor(private http: HttpClient) { }

  public getUsersProjects(userId: string): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.apiUrl}/projects/getMyProjects/${userId}`);
  }
  public getUsersInvestments(userId: string): Observable<ProjectCreator>{
    return this.http.get<ProjectCreator>(`${this.apiUrl}/projects/getMyInvestments/${userId}`);
  }
  public addInvestments(projectId: string, userId: string, funds: number): Observable<any>{
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('projectId', projectId);
    return this.http.post<any>(`${this.apiUrl}/projects/addInvestment/${funds}`, formData);
  }
}
