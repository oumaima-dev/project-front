import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectDetailsComponent} from './project-details/project-details.component';
import {ProjectAnouncementsComponent} from './project-anouncements/project-anouncements.component';
import {PublishProjectComponent} from './publish-project/publish-project.component';
import {UserAccountComponent} from './user-account/user-account.component';
import {UserAccountProjectsComponent} from './user-account-projects/user-account-projects.component';
import {UserProjectsComponent} from './user-projects/user-projects.component';
import {UserInvestmentsComponent} from './user-investments/user-investments.component';
import {EditProjectComponent} from './edit-project/edit-project.component';
import {UserProjectsDetailsComponent} from './user-projects-details/user-projects-details.component';
import {HomePageComponent} from './home-page/home-page.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ProjectHomeDetailsComponent} from './project-home-details/project-home-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomePageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'index', component: HomePageComponent},
  {path: 'newAnouncement', component: ProjectAnouncementsComponent},
  {path: 'projects/:id', component: ProjectDetailsComponent},
  {path: 'usersprojects/:id', component: UserProjectsDetailsComponent},
  {path: 'homeProjects/:id', component: ProjectHomeDetailsComponent},
  {path: 'newProject', component: PublishProjectComponent },
  {path: 'user', component: UserAccountComponent,
  children: [
    {path: '', redirectTo: 'newProjects', pathMatch: 'full'},
    {path: 'newProjects', component: UserAccountProjectsComponent },
    {path: 'myProjects', component: UserProjectsComponent},
    {path: 'myInvestments', component: UserInvestmentsComponent},
  ]},
  {path: 'edit/:id', component: EditProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
