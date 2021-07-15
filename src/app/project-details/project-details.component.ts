import { Component, OnInit } from '@angular/core';
import {Announcement, Project} from '../model/project';
import {ProjectService} from '../service/project.service';
import {HttpErrorResponse} from '@angular/common/http';
import {formatDate} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import {FundProject} from '../model/fundProject';
import {FundProjectService} from '../service/fundProject.service';
import {AuthenticationService} from '../service/authentication.service';
import {User} from '../model/user';
import {ProjectCreatorService} from '../service/project-creator.service';
import {NotificationType} from '../enum/notification-type.enum';
import {NotificationService} from '../service/notification.service';

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
  fundProjectD: FundProject = new FundProject();
  userId: string;
  private currentLoggedUser: User = new User();
  constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute, private fundService: FundProjectService,
              private authenticationService: AuthenticationService, private projectCreatorService: ProjectCreatorService, private notificationService: NotificationService) { }

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
        console.log(error.message);
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
      this.fundProject.raisedFunds = this.funds;
      console.log(this.fundProject);
      this.projectService.fundProject(this.fundProject, this.userId, this.funds).subscribe(
      (response: any) => {
          console.log(this.fundProject.raisedFunds);
          console.log('funded');
          this.sendNotification(NotificationType.SUCCESS, `Thank you for funding ${this.project.name}`);
          this.projectCreatorService.addInvestments(this.fundProject.projectId, this.userId, this.funds).subscribe(
            (response1: any) => {
              console.log('add investment');
              this.getFundsDetails(this.id);
            },
          (error1: HttpErrorResponse) => {
          console.log(error1.message);
          }
          );
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

  }
  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.showNotification(notificationType, message);
    } else {
      this.notificationService.showNotification(notificationType, 'An error occurred. Please try again');
    }
  }
}
