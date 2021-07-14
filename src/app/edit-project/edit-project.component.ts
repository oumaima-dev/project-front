import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../service/project.service';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../model/project';
import {HttpErrorResponse} from '@angular/common/http';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  newProject: Project;
  id: string;
  dat: string;
  date: string;
  constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
    });
    this.getProjectById();
  }

  public getProjectById(): void{
    this.projectService.getProjectById(this.id).subscribe(
      (response: Project) => {
        this.newProject = response;
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
  public updateProject(): void{
    this.projectService.updateProject(this.newProject).subscribe(
      (response: Project) => {
        this.newProject = response;
        console.log(response.endDate);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
