import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Announcement, Project} from './project';
import {environment} from '../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.apiUrl}/projects/all`);
  }

  public getProjectById(projectId: string): Observable<Project>{
    return this.http.get<Project>(`${this.apiUrl}/projects/${projectId}`);
  }
/*  public addProject(project: Project): Observable<Project>{
    return this.http.post<Project>(`${this.apiUrl}/projects/add`, project);
  }*/

  public addProject(project: Project, img: File): Observable<any>{
    const data = JSON.stringify(project);
    const formData = new FormData();
    formData.append('project', data);
    if (img) {
      formData.append('multipartFile', img);
    }
    return this.http.post<any>(`${this.apiUrl}/projects/add`, formData);
  }

  public addAnnouncement(announcement: Announcement, projectId: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/projects/${projectId}/newAnnouncement`, announcement);
  }

  public getAnnouncements(projectId: string): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.apiUrl}/projects/${projectId}/getAnnouncement`);
  }
}















