import { Component, OnInit } from '@angular/core';
import {Project} from '../project';
import {ProjectService} from '../project.service';
import {HttpErrorResponse} from '@angular/common/http';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-user-account-projects',
  templateUrl: './user-account-projects.component.html',
  styleUrls: ['./user-account-projects.component.css']
})
export class UserAccountProjectsComponent implements OnInit {

  projects: Project[];
  filteredProjects: Project[];
  filter = {charity: true, business: true};
  dat: string;


  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
  }
  public getProjects(): void{
    this.projectService.getProjects().subscribe(
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
  filterChange(): void{
    this.filteredProjects = this.projects.filter(x =>
      (x.category === 'business' && this.filter.business)
      || (x.category === 'donation' && this.filter.charity)
    );
  }
}
