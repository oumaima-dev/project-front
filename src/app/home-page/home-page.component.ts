import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../service/project.service';
import {Category, Project} from '../model/project';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {NotificationType} from '../enum/notification-type.enum';
import {NotificationService} from '../service/notification.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public projects: Project[];
  public filterCategory = { Business: false, Charity: false};
  public filterDate = { start: null, end: new Date()};
  public refreshing = false;
  public page = 1;

  constructor(private router: Router, private projectService: ProjectService, private authenticationService: AuthenticationService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getProjects();
  }


  public getProjects(): void{
    this.refreshing = true;
    this.projectService.getProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
        this.projectService.addProjectsToLocalStorage(response);
        this.sendNotification(NotificationType.SUCCESS, `${response.length} projects loaded successfully`);
        this.refreshing = false;
      },
      (error: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, error.error.message.toLowerCase());
        alert(error.message);
      }
    );
  }

  public searchProjects(searchString: string): void {
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

}
