import { Component, OnInit, Input } from '@angular/core';

import { UserAuthService } from "../../../../services/user-auth.service";
import { ValidationService } from "../../../../services/validation.service";
import { Router, NavigationEnd } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.css']
})
export class ModifyProfileComponent implements OnInit {
  id: String;
  name: String;
  email: String;
  phoneno: Number;
  rollno: String;
  school: String;
  dept: String;
  batch: Number;
  show: boolean = false;
  mySubscription;

  @Input() user: any;

  
  constructor(
    private userAuthService: UserAuthService,
    private validationService: ValidationService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService
    ) { }

  ngOnInit() {
  }

  load(){
    this.show = true;
    this.id = this.user.id;
    this.name = this.user.name;
    this.email= this.user.email;
    this.phoneno= this.user.phoneno;
    this.rollno= this.user.rollno;
    this.school= this.user.school;
    this.dept= this.user.dept;
    this.batch= this.user.batch;
  }

  clear(){
    this.show = false;
  }

  updateProfile(){
    const user = {
      id: this.id,
      name: this.name,
      email: this.email,
      phoneno: this.phoneno,
      rollno: this.rollno,
      school: this.school,
      dept: this.dept,
      batch: this.batch
    }

    if(!this.validationService.validateModifyUser(user)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Please fill in all the fields'], 
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
      this.router.navigate(['/user/profile']);
    }else if(!this.validationService.validateEmail(user.email)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Enter a valid Email'], 
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
      this.router.navigate(['/user/profile']);
    }else{
      this.userAuthService.updateProfile(user, user.id).subscribe((data: any) => {
        if(data.success){
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: true,
            timeout: 3000,
            type: 'success'
          });
          // window.location.reload();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/user/profile']));
        }else{
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: true,
            timeout: 3000,
            type: 'danger'
          });
          this.router.navigate(['/user/profile']);
        }
      });
    }
  }
}
