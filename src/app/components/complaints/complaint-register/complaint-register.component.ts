import { Component, OnInit } from '@angular/core';

import { ValidationService } from '../../../services/validation.service';
import { ComplaintAuthService } from '../../../services/complaint-auth.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-complaint-register',
  templateUrl: './complaint-register.component.html',
  styleUrls: ['./complaint-register.component.css']
})
export class ComplaintRegisterComponent implements OnInit {
  title: String;
  categories: Array<String>;
  category: String;
  user_id: String;
  dean_id: String;
  msg: String;
  registeredDate: String = Date().substring(0, 24);

  constructor(
    private validationService: ValidationService,
    private complaintAuthService: ComplaintAuthService,
    private userAuthService: UserAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
    if(this.userAuthService.ifAdmin()){
      this.userAuthService.getCatDean().subscribe((data: any) => {
        if(data.success){
          let temp = [], k=0;
          for(let i=0; i<data.cat.length; i++){
            for(let j=0; j<data.cat[i].length; j++){
              temp[k] = data.cat[i][j];
              k++;
            }
          }
          this.categories = temp;
        }else{
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: false,
            timeout: 3000,
            type: 'danger'
          });
          this.router.navigate(['/complaint/register']);
        }
      });
    }else{
      this.ngFlashMessageService.showFlashMessage({
        messages: ['You are not Authorized'], 
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
      this.router.navigate(['/']);
    }
  }

  registerComplaint(){
    let complaint = {};

    this.userAuthService.getUserID().subscribe((data: any) => {
      complaint = {
        title: this.title,
        category: this.category,
        msg: this.msg
      }
      if(!this.validationService.validateRegisterComplaint(complaint)){
        this.ngFlashMessageService.showFlashMessage({
          messages: ['Please fill in all the fields'], 
          dismissible: false,
          timeout: 3000,
          type: 'danger'
        });
        this.router.navigate(['/complaint/register']);
      }else{
        this.complaintAuthService.registerComplaint(complaint).subscribe((data: any) => {
          if(!data.success){
            if(data.unauth){
              this.ngFlashMessageService.showFlashMessage({
                messages: [data.msg], 
                dismissible: false,
                timeout: 3000,
                type: 'danger'
              });
              this.router.navigate(['/']);
            }else{
              this.ngFlashMessageService.showFlashMessage({
                messages: [data.msg], 
                dismissible: false,
                timeout: 3000,
                type: 'danger'
              });
              this.router.navigate(['/complaint/register']);
            }
          }else{
            this.ngFlashMessageService.showFlashMessage({
              messages: [data.msg], 
              dismissible: false,
              timeout: 3000,
              type: 'success'
            });
            this.router.navigate(['/user/dashboard']);
          }
        });
      }
    });
  }
}
