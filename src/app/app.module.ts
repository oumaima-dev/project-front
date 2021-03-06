import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './footer/footer.component';
import {UserService} from './service/user.service';
import {AuthenticationService} from './service/authentication.service';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {AuthenticationGuard} from './guard/authentication.guard';
import {NotificationModule} from './notification.module';
import {NotificationService} from './service/notification.service';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ConfirmEqualValidatorDirective} from './utility/confirm-equal-validator.directive';
import { ProjectHomeDetailsComponent } from './project-home-details/project-home-details.component';
// import {HomePageComponent} from "./home-page/home-page.component";

@NgModule({
  declarations: [
    AppComponent,
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
    UserProjectsDetailsComponent,
    HomePageComponent,
    FooterComponent,
    AppComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    // HomePageComponent,
    ConfirmEqualValidatorDirective,
    ProjectHomeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NotificationModule,
    NgxPaginationModule
  ],
  providers: [NotificationService, AuthenticationGuard, UserService, AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
