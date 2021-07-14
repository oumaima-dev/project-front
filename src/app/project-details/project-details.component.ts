import { Component, OnInit } from '@angular/core';
import {Announcement, Project} from '../model/project';
import {ProjectService} from '../service/project.service';
import {HttpErrorResponse} from '@angular/common/http';
import {formatDate} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import {FundProject} from '../model/fundProject';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  project: Project;
  dat: string;
  id: string;
  announcements: Announcement[];
  funds: number;
  fundProject: FundProject = new FundProject();
  userId: string;
  constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
    });
    this.getProjectById();
    this.getAnnouncements();
  }

  public getProjectById(): void{
    this.projectService.getProjectById(this.id).subscribe(
      (response: Project) => {
        this.project = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getDate(date: Date): string{
    if (date != null){
      this.dat = formatDate(date, 'dd/MM/yyyy', 'en-US');
      return this.dat;
    }
    else{
      return null;
    }
  }
  public getAnnouncements(): void{
    this.projectService.getAnnouncements(this.id).subscribe(
      (response: Announcement[]) => {
        if (response != null){
          this.announcements = response;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public saveFund(projectId: string): void {
      this.fundProject.projectId = projectId;
      this.userId = '10';
      this.fundProject.funds = this.funds;
      console.log(this.fundProject);
      this.projectService.fundProject(this.fundProject, this.userId, this.funds).subscribe(
      (response: any) => {
          console.log(this.fundProject.funds);
          alert('funded');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }
}
