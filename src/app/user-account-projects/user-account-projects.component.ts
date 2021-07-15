import { Component, OnInit } from '@angular/core';
import {Project} from '../model/project';
import {ProjectService} from '../service/project.service';
import {HttpErrorResponse} from '@angular/common/http';
import {formatDate } from '@angular/common';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {NotificationService} from '../service/notification.service';
import {NotificationType} from '../enum/notification-type.enum';
import {User} from '../model/user';

@Component({
  selector: 'app-user-account-projects',
  templateUrl: './user-account-projects.component.html',
  styleUrls: ['./user-account-projects.component.css']
})
export class UserAccountProjectsComponent implements OnInit {

  projects: Project[] = [];
  dat: string;
  userId: string;
  public filterCategory = { Business: false, Charity: false};
  public filterDate = { start: null, end: new Date()};
  public refreshing = false;
  public page = 1;
  private currentLoggedUser: User = new User();

  constructor(private router: Router, private projectService: ProjectService, private authenticationService: AuthenticationService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.currentLoggedUser = this.authenticationService.getUserFromLocalCache();
    this.userId = this.currentLoggedUser.userId;
    this.getProjects();
  }


  public getProjects(): void{
    this.refreshing = true;
    this.projectService.getProjects().subscribe(
      (response: Project[]) => {
        for (const project of response){
          if (project.projectOwner !== this.userId) {
          this.projects.push(project);
          }
        }
        this.projectService.addProjectsToLocalStorage(this.projects);
        this.sendNotification(NotificationType.SUCCESS, `${this.projects.length} projects loaded successfully`);
        this.refreshing = false;
      },
      (error: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, error.error.message.toLowerCase());
      }
    );
  }

  public searchUsers(searchString: string): void {
    const results: Project[] = [];
    console.log(this.projectService.getProjectsToLocalStorage());
    for (const project of this.projectService.getProjectsToLocalStorage()) {
      if ((project.name !== null && project.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ) ||
        (project.shortIdea !== null && project.shortIdea.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ) ||
        (project.fundGoal !== null && project.fundGoal.toString().indexOf(searchString.toLowerCase()) !== -1 )){
        results.push(project);
      }
    }
    this.projects = results;
    if (results.length === 0 || !searchString) {
      this.projects = this.projectService.getProjectsToLocalStorage();
    }
  }

  public filterChange(): void {
    let results: Project[] = [];
    results = this.projectService.getProjectsToLocalStorage().filter(
      project =>
        (project.category.toLowerCase() === 'business' && this.filterCategory.Business)
        || (project.category.toLowerCase() === 'charity' && this.filterCategory.Charity)
    );

    this.projects = results;
    if (results.length === 0) {
      this.projects = this.projectService.getProjectsToLocalStorage();
    }
  }

  public filterChangeDate(): void {
    let results: Project[] = [];
    results = this.projectService.getProjectsToLocalStorage().filter(
      project => {
        if (this.filterDate.start !== null) {
          return (project.creationDate >= this.filterDate.start &&
            project.endDate < this.filterDate.end);
        } else {
          return project.endDate < this.filterDate.end;
        }
      }
    );
    this.projects = results;
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.showNotification(notificationType, message);
    } else {
      this.notificationService.showNotification(notificationType, 'An error occurred. Please try again');
    }
  }

  public getDate(date: Date): string{
     this.dat = formatDate(date, 'dd/MM/yyyy', 'en-US');
     return this.dat;
  }


}
