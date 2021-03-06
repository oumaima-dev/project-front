import { Component, OnInit } from '@angular/core';
import {Announcement, Project} from '../model/project';
import {ProjectService} from '../service/project.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {formatDate} from '@angular/common';
import {FundProject} from '../model/fundProject';
import {User} from '../model/user';
import {AuthenticationService} from '../service/authentication.service';
import {ProjectCreatorService} from '../service/project-creator.service';
import {FundProjectService} from '../service/fundProject.service';

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
  userId: string;
  private currentLoggedUser: User = new User();
  fundProjectD: FundProject = new FundProject();
  constructor(private projectService: ProjectService, private fundService: FundProjectService, private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService, private projectCreatorService: ProjectCreatorService) { }

  ngOnInit(): void {
    this.currentLoggedUser = this.authenticationService.getUserFromLocalCache();
    this.userId = this.currentLoggedUser.userId;
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
    });
    this.getProjectById();
    this.getAnnouncements();
    this.getFundsDetails(this.id);
  }
  public getFundsDetails(id: string): void{
    this.fundService.getProjectById(id).subscribe(
      (response: FundProject) => {
        this.fundProjectD = response;
        console.log(this.fundProjectD);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
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
