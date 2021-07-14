import { Component, OnInit } from '@angular/core';
import {Announcement, Project} from '../model/project';
import {ProjectService} from '../service/project.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-user-projects-details',
  templateUrl: './user-projects-details.component.html',
  styleUrls: ['./user-projects-details.component.css']
})
export class UserProjectsDetailsComponent implements OnInit {
  project: Project;
  dat: string;
  id: string;
  announcements: Announcement[];
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

}
