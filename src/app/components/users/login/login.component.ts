import { Component, OnInit } from '@angular/core';

import { ValidationService } from '../../../services/validation.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;

  constructor(
    private validationService: ValidationService,
    private userAuthService: UserAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
  }

  login(){
    const user = {
      email: this.email,
      password: this.password
    }

    if(!this.validationService.validateLogin(user)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Please fill in all the fields'], 
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
      this.router.navigate(['/user/login']);
    }else if(!this.validationService.validateEmail(user.email)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Enter a valid email'], 
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
      this.router.navigate(['/user/login']);
    }else{
      this.userAuthService.authenticateUser(user).subscribe((data: any) => {
        if(data.success){
          this.userAuthService.storeUserData(data.user, data.token);
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: false,
            timeout: 3000,
            type: 'success'
          });
          this.router.navigate(['/']);
        }else{
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg],
            dismissible: false,
            timeout: 3000,
            type: 'danger'
          });
          this.router.navigate(['/user/login']);
        }
      });
    }
  }
}
