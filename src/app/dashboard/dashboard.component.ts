import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {NotificationService} from '../service/notification.service';
import {Subscription} from 'rxjs';
import {NotificationType} from '../enum/notification-type.enum';
import {HttpErrorResponse} from '@angular/common/http';
import {CustomHttpResponse} from '../model/custom-http-response';
import {NgForm} from '@angular/forms';
import {Utility} from '../utility/utility';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public users: User[];
  private subscription: Subscription[] = [];
  public page = 1;
  public refreshing = false;
  public selectUser: User = new User();
  public deleteUser: User = new User();
  public resetPassUser: User = new User();
  public currentEmail: string;
  private currentUsername: string;
  public editUser: User = new User();
  public fileName: string | null;
  public profileImage: File | null;
  private currentLoggedUser: User = new User();

  constructor(private router: Router, private userService: UserService, private notificationService: NotificationService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (!this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
    if (!this.authenticationService.isAnAdmin()) {
      this.router.navigateByUrl('/home');
    }
    this.getUsers(true);
    this.currentLoggedUser = this.authenticationService.getUserFromLocalCache();
  }

  public onSignOut(): void {
    console.log(this.currentLoggedUser);
    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');
  }

  public getUsers(showNotification: boolean): void{
    this.refreshing = true;
    this.subscription.push(
      this.userService.getUsers().subscribe(
        (response: User[]) => {
          this.userService.addUsersToLocalStorage(response);
          this.users = response;
          this.sendNotification(NotificationType.SUCCESS, `${response.length} users loaded successfully`);
          this.refreshing = false;
        },
        (errorResponse: HttpErrorResponse ) => {
          console.log(errorResponse);
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message.toLowerCase());
          this.refreshing = false;
        }
      )
    );
  }

  public searchUsers(searchString: string): void {
    const results: User[] = [];
    console.log(this.userService.getUsersToLocalStorage());
    for (const user of this.userService.getUsersToLocalStorage()) {
      if ((user.firstName !== null && user.firstName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ) ||
        (user.lastName !== null && user.lastName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ) ||
        (user.username !== null && user.username.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ) ||
        (user.email !== null && user.email.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)){
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !searchString) {
      this.users = this.userService.getUsersToLocalStorage();
    }
  }

  public onSelectUser(selectUser: User): void {
    this.selectUser = selectUser;
    console.log(this.selectUser);
    document.getElementById('openUserInfo').click();
  }

  public onDeleteUserModel(deleteUser: User): void {
    this.deleteUser = deleteUser;
    document.getElementById('openUserDelete').click();
  }

  public onDeleteUser(): void {
    this.subscription.push(
      this.userService.deleteUser(this.deleteUser.userId).subscribe(
        (response: CustomHttpResponse) => {
          console.log(response);
          this.sendNotification(NotificationType.SUCCESS, response.message.toLowerCase());
          this.getUsers(true);
        }, (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message.toLowerCase());
        }
      )
    );
  }

  public onResetPassword(resetPassForm: NgForm): void {
    const formData = Utility.createResetPasswordFormData(this.currentUsername, resetPassForm.value);
    this.subscription.push(
      this.userService.resetPassword(this.currentEmail, formData).subscribe(
        (response: CustomHttpResponse) => {
          document.getElementById('closeResetPasswordModalButton').click();
          this.sendNotification(NotificationType.SUCCESS, response.message.toLowerCase());
          this.getUsers(false);
          resetPassForm.resetForm();
        }, (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message.toLowerCase());
          resetPassForm.resetForm();
        }
      )
    );
  }

  public onResetPasswordUserModel(resetPassUser: User): void {
    this.resetPassUser = resetPassUser;
    this.currentEmail = resetPassUser.email;
    this.currentUsername = resetPassUser.username;
    document.getElementById('openUserResetPassword').click();
  }


  public onEditUserModel(): void {
    this.editUser = this.currentLoggedUser;
    console.log(this.editUser);
    this.currentUsername = this.currentLoggedUser.username;
    document.getElementById('openUserEdit').click();
  }

  public onEditUser(): void {
    console.log(this.editUser);
    const formData = Utility.createUserFormData(this.currentUsername, this.editUser, this.profileImage);
    this.subscription.push(
      this.userService.updateUser(formData).subscribe(
        (response: User) => {
          document.getElementById('closeEditModalButton').click();
          localStorage.removeItem('user');
          this.authenticationService.addUserToLocalStorage(this.editUser);
          this.getUsers(false);
          this.fileName = null;
          this.profileImage = null;
          this.sendNotification(NotificationType.SUCCESS, `${response.lastName} ${response.firstName} updated successfully`);
        }, (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message.toLowerCase());
          this.profileImage = null;
          // this.router.navigateByUrl('/dashboard');
        }
      )
    );
  }

  // TypeScript compiler doesn't know you are returning an input element and we dont have an Event class specific for this.
  public onProfileImageChange($event: Event): void {
    console.log($event);
    const target = $event.target as HTMLInputElement;
    if (target.files) {
      this.fileName = target.files[0].name;
      this.profileImage = target.files[0];
    }
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.showNotification(notificationType, message);
    } else {
      this.notificationService.showNotification(notificationType, 'An error occurred. Please try again');
    }
  }

}
