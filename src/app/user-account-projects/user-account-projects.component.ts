import { Component, OnInit } from '@angular/core';
import {Project} from '../model/project';
import {ProjectService} from '../service/project.service';
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
  dat: string;
  startDate: string;
  endDate: string;
  userId: string;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
  }
  public getProjects(): void{
    this.projectService.getProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
        // this.projects = response.filter(p => p.userId !== this.userId);
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
  onChange(e): void{
    if (e.target.checked){
      console.log(e.target.value);
      this.filteredProjects = this.projects.filter(p => p.category.toLowerCase() === e.target.value);
      console.log(this.filteredProjects);
      this.projects = this.filteredProjects;
    }
    else{
      this.getProjects();
    }
  }

  onStartDateChange(e): string{
    this.startDate = this.getDate(e.target.value);
    console.log(this.startDate);
    this.filteredProjects = this.projects.filter(d => this.getDate(d.creationDate) >= this.startDate);
    this.projects = this.filteredProjects;
    return this.startDate;
    // let.selectedMembers = this.members.filter(
      // m => new Date(m.date) >= new Date(startDate) && new Date(m.date) <= new Date(endDate)
    // );
  }

  onEndDateChange(e): string{
    this.endDate = this.getDate(e.target.value);
    console.log(this.endDate);
    this.filteredProjects = this.projects.filter(d => this.getDate(d.creationDate) >= this.startDate);
    return this.endDate;
  }
  public filterBydate(): void{
    // this.filteredProjects;
  }

}
