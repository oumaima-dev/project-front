import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {FundProject} from '../model/fundProject';

@Injectable({
  providedIn: 'root'
})
export class FundProjectService {

  private apiUrl = environment.api;

  constructor(private http: HttpClient) { }

  public getProjectById(projectId: string): Observable<FundProject>{
    return this.http.get<FundProject>(`${this.apiUrl}/investment/getFundProject/${projectId}`);
  }
}
