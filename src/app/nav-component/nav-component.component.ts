import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {NgForm} from '@angular/forms';
import {User} from '../user';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.css']
})
export class NavComponentComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  public onOpenModal(mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute(`data-toggle`, `modal`);
    if (mode === 'signIn'){
      document.getElementById('register-user-form')?.click();
      button.setAttribute(`data-target`, `#loginUserModal`);
    }
    if (mode === 'register'){
      document.getElementById('login-user-form')?.click();
      button.setAttribute(`data-target`, `#registerUserModal`);
    }
    container?.appendChild(button);
    button.click();
  }

  public onSignIn(loginForm: NgForm): void{
    this.userService.loginUser(loginForm.value).subscribe(
      (response: User) => {
        // TODO: when user return what i can do create session or what for remain this user data for next step
        console.log(response);
        loginForm.reset();
      },
      (error: HttpErrorResponse) => {
        // TODO: add erro message to Login-Modal like Toast or tage Div
        alert(error.message);
        loginForm.reset();
      }
    )
  }

  public onRegister(registerForm: NgForm): void{
    this.userService.registerUser(registerForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.onOpenModal('signIn');
        registerForm.reset();
      },
      (error: HttpErrorResponse) => {
        // TODO: add erro message to Register-Modal like Toast or tage Div
        alert(error.message);
        registerForm.reset();
      }
    )
  }
}
