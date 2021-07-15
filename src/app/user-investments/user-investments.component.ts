import { Component, OnInit } from '@angular/core';
import {Project} from '../model/project';
import {User} from '../model/user';
import {ProjectCreatorService} from '../service/project-creator.service';
import {ProjectService} from '../service/project.service';
import {AuthenticationService} from '../service/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {formatDate} from '@angular/common';
import {ProjectCreator} from '../model/projectCreator';

@Component({
  selector: 'app-user-investments',
  templateUrl: './user-investments.component.html',
  styleUrls: ['./user-investments.component.css']
})
export class UserInvestmentsComponent implements OnInit {
  public projectCreator: ProjectCreator = new ProjectCreator();
  public dat: string;
  public userId: string;
  public projects: Project[] = [] ;
  private currentLoggedUser: User = new User();
  constructor(private projectCreatorService: ProjectCreatorService, private projectService: ProjectService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    this.currentLoggedUser = this.authenticationService.getUserFromLocalCache();
    this.userId = this.currentLoggedUser.userId;
    this.getProjects();
  }

  public getProjects(): void{
    this.projectCreatorService.getUsersInvestments(this.userId).subscribe(
      (response: ProjectCreator) => {
        this.projectCreator = response;
        this.projects = this.projectCreator.myInvestments;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  public getDate(date: Date): string{
    this.dat = formatDate(date, 'dd/MM/yyyy', 'en-US');
    return this.dat;
  }
}
