import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectComponentComponent} from './project-component/project-component.component';
import {ProjectDetailsComponent} from './project-details/project-details.component';
import {ProjectAnouncementsComponent} from './project-anouncements/project-anouncements.component';
import {PublishProjectComponent} from './publish-project/publish-project.component';
import {UserAccountComponent} from './user-account/user-account.component';
import {UserAccountProjectsComponent} from './user-account-projects/user-account-projects.component';

const routes: Routes = [
  {path: 'index', component: ProjectComponentComponent},
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'myAccount', component: UserAccountComponent},
  {path: '', redirectTo: '/myAccount', pathMatch: 'full'},
  {path: 'newAnouncement', component: ProjectAnouncementsComponent},
  {path: '', redirectTo: '/newAnouncement', pathMatch: 'full'},
  {path: '', redirectTo: '/details', pathMatch: 'full'},
  {path: 'details', component: ProjectDetailsComponent},
  {path: 'newProject', component: PublishProjectComponent },
  {path: '', redirectTo: '/newProject', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
