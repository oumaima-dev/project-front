import { Component, OnInit } from '@angular/core';
import {Announcement, Project} from '../model/project';
import {FundProject} from '../model/fundProject';
import {User} from '../model/user';
import {ProjectService} from '../service/project.service';
import {ActivatedRoute} from '@angular/router';
import {FundProjectService} from '../service/fundProject.service';
import {ProjectCreatorService} from '../service/project-creator.service';
import {NotificationService} from '../service/notification.service';
import {HttpErrorResponse} from '@angular/common/http';
import {formatDate} from '@angular/common';
import {NotificationType} from '../enum/notification-type.enum';

@Component({
  selector: 'app-project-home-details',
  templateUrl: './project-home-details.component.html',
  styleUrls: ['./project-home-details.component.css']
})
export class ProjectHomeDetailsComponent implements OnInit {

  project: Project;
  dat: string;
  id: string;
  announcements: Announcement[];
  funds: number;
  fundProjectD: FundProject = new FundProject();
  constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute, private fundService: FundProjectService,
              private projectCreatorService: ProjectCreatorService, private notificationService: NotificationService) { }

  ngOnInit(): void {
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

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.showNotification(notificationType, message);
    } else {
      this.notificationService.showNotification(notificationType, 'An error occurred. Please try again');
    }
  }

}
