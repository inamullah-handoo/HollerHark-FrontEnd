import { Component, OnInit, Input } from '@angular/core';

import { UserAuthService } from "../../../../services/user-auth.service";
import { ValidationService } from "../../../../services/validation.service";
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: String;
  newPassword: String;
  show: boolean = false;

  @Input() id: string;

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
  }

  clear(){
    this.oldPassword = null;
    this.newPassword = null;
    this.show = false;
  }

  updatePassword(){
    const passwords = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    }

    if(!this.validationService.validateModifyPassword(passwords)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Please fill in all the fields'], 
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
      this.router.navigate(['/user/profile']);
    }else{
      this.userAuthService.updatePassword(passwords, this.id).subscribe((data: any) => {
        if(!data.success){
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: true,
            timeout: 3000,
            type: 'danger'
          });
          this.router.navigate(['/user/profile']);
        }else{
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: true,
            timeout: 3000,
            type: 'success'
          });
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/user/profile']));
        }
      });
    }
  }
}
