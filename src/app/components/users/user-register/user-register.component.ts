import { Component, OnInit } from '@angular/core';

import { ValidationService } from "../../../services/validation.service";
import { UserAuthService } from "../../../services/user-auth.service";
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  name: String;
  email: String;
  phoneno: Number;
  rollno: String;
  school: String;
  dept: String;
  batch: Number;
  password: String;
  role: String;
  show: Boolean;
  showSchool: Boolean = true;

  constructor(
    private validationService: ValidationService,
    private userAuthService: UserAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
  }

  changeRole(){
    if(this.role == 'Student'){
      this.show = true;
    }else{
      this.show = false;
    }
    if(this.role == 'Non-Teaching'){
      this.showSchool = false;
    }
  }

  register(){
    const user = {
      name: this.name,
      email: this.email,
      phoneno: this.phoneno,
      rollno: this.rollno,
      school: this.school,
      dept: this.dept,
      batch: this.batch,
      password: this.password,
      role: this.role
    }

    if(!this.validationService.validateRegister(user)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Please fill in all the fields'], 
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
      this.router.navigate(['/user/register']);
    }else if(!this.validationService.validateEmail(user.email)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Enter a valid Email'], 
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
      this.router.navigate(['/user/register']);
    }else{
      this.userAuthService.registerUser(user).subscribe((data: any) => {
        if(data.success){
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: false,
            timeout: 3000,
            type: 'success'
          });
          this.router.navigate(['/user/login']);
        }else{
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: false,
            timeout: 3000,
            type: 'danger'
          });
          this.router.navigate(['/user/register']);
        }
      });
    }
  }
}
