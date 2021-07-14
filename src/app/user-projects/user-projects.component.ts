import { Component, OnInit } from '@angular/core';
import {Project} from '../model/project';
import {HttpErrorResponse} from '@angular/common/http';
import {ProjectCreatorService} from '../service/project-creator.service';
import {formatDate} from '@angular/common';
import {ProjectService} from '../service/project.service';


@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css']
})
export class UserProjectsComponent implements OnInit {

  public projects: Project[] = [];
  public dat: string;
  public userId: string;
  public deletedProject: Project ;
  constructor(private projectCreatorService: ProjectCreatorService, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  public getProjects(): void{
    this.userId = '10';
    this.projectCreatorService.getUsersProjects(this.userId).subscribe(
      (response: Project[]) => {
        this.projects = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getDate(date: Date): string{
    this.dat = formatDate(date, 'dd/MM/yyyy', 'en-US');
    return this.dat;
  }


  public deleteProject(projectId: string): void{
    this.projectService.deleteProject(projectId).subscribe(
      (response: void) => {
        console.log(response);
        this.getProjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(project: Project): void {
    console.log(project);
    const container = document.getElementById('#container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#delete');
    this.deletedProject = project;
    container.appendChild(button);
    button.click();
  }
}
