import { Component, OnInit } from '@angular/core';

import { UserAuthService } from "../../../../services/user-auth.service";
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-total-users',
  templateUrl: './total-users.component.html',
  styleUrls: ['./total-users.component.css']
})
export class TotalUsersComponent implements OnInit {
  st: Number;
  teach: Number;
  nont: Number;
  de: Number;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.userAuthService.getAllUsers().subscribe((data: any) => {
      if(data.success){
        this.st = data.st;
        this.teach = data.teach;
        this.nont = data.nont;
        this.de = data.de;
      }else{
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
          this.router.navigate(['/admin/dashboard']);
        }
      }
    });
  }

}
