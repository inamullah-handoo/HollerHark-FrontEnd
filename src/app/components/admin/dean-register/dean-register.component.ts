import { Component, OnInit } from '@angular/core';

import { ValidationService } from "../../../services/validation.service";
import { UserAuthService } from "../../../services/user-auth.service";
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-dean-register',
  templateUrl: './dean-register.component.html',
  styleUrls: ['./dean-register.component.css']
})
export class DeanRegisterComponent implements OnInit {
  name: String;
  email: String;
  phoneno: Number;
  school: String;
  password: String;

  constructor(
    private validationService: ValidationService,
    private userAuthService: UserAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
  }

  register(){
    const user = {
      name: this.name,
      email: this.email,
      phoneno: this.phoneno,
      school: this.school,
      password: this.password,
      role: 'Dean'
    }

    if(!this.validationService.validateRegister(user)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Please fill in all the fields'], 
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
      this.router.navigate(['/admin/dean/register']);
    }else if(!this.validationService.validateEmail(user.email)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Enter a valid Email'], 
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
      this.router.navigate(['/admin/dean/register']);
    }else{
      this.userAuthService.registerUser(user).subscribe((data: any) => {
        if(data.success){
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: false,
            timeout: 3000,
            type: 'success'
          });
          this.router.navigate(['/admin/dashboard']);
        }else{
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: false,
            timeout: 3000,
            type: 'danger'
          });
          this.router.navigate(['/admin/dean/register']);
        }
      });
    }
  }
}
