import { Component, OnInit } from '@angular/core';
import {Announcement, Project} from '../project';
import {ProjectService} from '../project.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-project-anouncements',
  templateUrl: './project-anouncements.component.html',
  styleUrls: ['./project-anouncements.component.css']
})
export class ProjectAnouncementsComponent implements OnInit {

  public projects: Project[];
  newAnnouncement: Announcement = new Announcement();
  projectId: string;


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


  public publish(announcementForm: NgForm): void{
    this.projectService.addAnnouncement(this.newAnnouncement, this.projectId).subscribe(
      (response: any) => {
        console.log(response);
        alert('announcement added succefly');
      },
      (error: HttpErrorResponse) => {
        alert((error.message));
      }
    );
    console.log(this.projectId, this.newAnnouncement);
  }
}
