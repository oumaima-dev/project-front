import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ProjectService} from '../project.service';
import {Project} from '../project';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-publish-project',
  templateUrl: './publish-project.component.html',
  styleUrls: ['./publish-project.component.css']
})
export class PublishProjectComponent implements OnInit {

  newProject: Project = new Project();
  img: File;
  imgFile: File;
  constructor(private projectService: ProjectService) { }


  ngOnInit(): void {
    this.newProject.category = 'charity';
  }


  onFileChange(event): void {
    this.imgFile = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (ev: any) => {
      this.img = ev.target.result;
    };
    fr.readAsDataURL(this.imgFile);
  }


  onAddProject(addProjectForm: NgForm): void {
    const formData = new FormData();
    this.projectService.addProject(this.newProject, this.imgFile).subscribe(
      (response: Project) => {
        console.log(response);
        alert('project added succefly');
      },
      (error: HttpErrorResponse) => {
        alert((error.message));
        this.reset();
      }
    );
  }

  reset(): void{
    this.imgFile = null;
    this.img = null;
  }
}
















