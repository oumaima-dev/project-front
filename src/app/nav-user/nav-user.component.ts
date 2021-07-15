import { Component, OnInit } from '@angular/core';
import {NotificationType} from '../enum/notification-type.enum';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../model/user';
import {Utility} from '../utility/utility';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {NotificationService} from '../service/notification.service';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css']
})
export class NavUserComponent implements OnInit {

  private subscription: Subscription[] = [];
  public selectUser: User = new User();
  private currentUsername: string;
  public editUser: User = new User();
  public fileName: string | null;
  public profileImage: File | null;
  public currentLoggedUser: User = new User();

  constructor(private router: Router, private userService: UserService, private notificationService: NotificationService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.currentLoggedUser = this.authenticationService.getUserFromLocalCache();
    this.editUser = this.currentLoggedUser;
  }

  public onSignOut(): void {
    this.authenticationService.logOut();
    this.router.navigateByUrl('/home');
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
          this.fileName = null;
          this.profileImage = null;
          this.sendNotification(NotificationType.SUCCESS, `${response.lastName} ${response.firstName} updated successfully`);
        }, (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message.toLowerCase());
          this.profileImage = null;
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
