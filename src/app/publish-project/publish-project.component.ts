import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ProjectService} from '../service/project.service';
import {Project} from '../model/project';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../model/user';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-publish-project',
  templateUrl: './publish-project.component.html',
  styleUrls: ['./publish-project.component.css']
})
export class PublishProjectComponent implements OnInit {

  newProject: Project = new Project();
  img: File;
  imgFile: File;
  private currentLoggedUser: User = new User();
  userId: string;
  constructor(private projectService: ProjectService, private router: Router, private authenticationService: AuthenticationService) { }


  ngOnInit(): void {
    this.newProject.category = 'charity';
    this.currentLoggedUser = this.authenticationService.getUserFromLocalCache();
    this.userId = this.currentLoggedUser.userId;
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
    this.newProject.projectOwner = this.userId;
    this.projectService.addProject(this.newProject, this.userId, this.imgFile).subscribe(
      (response: Project) => {
        console.log(response);
        this.router.navigateByUrl('/user/myProjects');
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
















