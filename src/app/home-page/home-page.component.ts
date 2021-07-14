import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../service/project.service';
import {Project} from '../model/project';
import {HttpErrorResponse} from '@angular/common/http';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  projects: Project[];
  dat: string;
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

}
