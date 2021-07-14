import { Component, OnInit } from '@angular/core';
import {Announcement, Project} from '../model/project';
import {ProjectService} from '../service/project.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-anouncements',
  templateUrl: './project-anouncements.component.html',
  styleUrls: ['./project-anouncements.component.css']
})
export class ProjectAnouncementsComponent implements OnInit {

  public projects: Project[];
  newAnnouncement: Announcement = new Announcement();
  projectId: string;


  constructor(private projectService: ProjectService, private router: Router) { }

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


  public publish(announcementForm: NgForm): void{
    this.newAnnouncement.annCreationDate = new Date();
    this.projectService.addAnnouncement(this.newAnnouncement, this.projectId).subscribe(
      (response: any) => {
        console.log(response);
        // this.sendNotification(NotificationType.SUCCESS, 'announcement added successfully');
        this.router.navigateByUrl('/user/myProjects');
      },
      (error: HttpErrorResponse) => {
        alert((error.message));
      }
    );
    console.log(this.projectId, this.newAnnouncement);
  }
}
