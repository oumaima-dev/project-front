import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Announcement, Project} from '../model/project';
import {environment} from '../../environments/environment';
import {FundProject} from '../model/fundProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = environment.api;

  constructor(private http: HttpClient) { }

  public getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.apiUrl}/projects/all`); // api gateway
  }

  public getProjectById(projectId: string): Observable<Project>{
    return this.http.get<Project>(`${this.apiUrl}/projects/${projectId}`);
  }
/*  public addProject(project: Project): Observable<Project>{
    return this.http.post<Project>(`${this.apiUrl}/projects/add`, project);
  }*/

  public addProject(project: Project, userId: string, img: File): Observable<any>{
    const data = JSON.stringify(project);
    const formData = new FormData();
    formData.append('project', data);
    if (img) {
      formData.append('multipartFile', img);
    }
    formData.append('userId', userId);
    return this.http.post<any>(`${this.apiUrl}/projects/add`, formData);
  }

  public addAnnouncement(announcement: Announcement, projectId: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/projects/${projectId}/newAnnouncement`, announcement);
  }

  public getAnnouncements(projectId: string): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.apiUrl}/projects/${projectId}/getAnnouncement`);
  }

  public updateProject(project: Project): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/projects/update`, project);
  }

  public deleteProject(projectId: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/projects/delete/${projectId}`);
  }

  public fundProject(fundProject: FundProject, userId: string, fund: number): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/investment/addFund/${userId}/${fund}`, fundProject);
  }

  public addProjectsToLocalStorage(projects: Project[]): void {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  public getProjectsToLocalStorage(): Project[] | null {
    if (localStorage.getItem('projects')) {
      return JSON.parse(localStorage.getItem('projects') as string);
    }
    return null;
  }
}















