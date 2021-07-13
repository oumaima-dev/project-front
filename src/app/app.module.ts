import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponentComponent } from './project-component/project-component.component';
import { NavComponentComponent } from './nav-component/nav-component.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectAnouncementsComponent } from './project-anouncements/project-anouncements.component';
import { PublishProjectComponent } from './publish-project/publish-project.component';
import { NavUserComponent } from './nav-user/nav-user.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserAccountProjectsComponent } from './user-account-projects/user-account-projects.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UserProjectsComponent } from './user-projects/user-projects.component';
import { UserInvestmentsComponent } from './user-investments/user-investments.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { UserProjectsDetailsComponent } from './user-projects-details/user-projects-details.component';

import {NotificationModule} from './notification.module';
import {NotificationService} from './notification.service';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponentComponent,
    NavComponentComponent,
    ProjectDetailsComponent,
    ProjectAnouncementsComponent,
    PublishProjectComponent,
    NavUserComponent,
    UserAccountComponent,
    UserAccountProjectsComponent,
    UserProjectsComponent,
    UserInvestmentsComponent,
    EditProjectComponent,
    UserProjectsDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NotificationModule
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
