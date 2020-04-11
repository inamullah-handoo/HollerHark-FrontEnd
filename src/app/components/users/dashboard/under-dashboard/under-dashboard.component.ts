import { Component, OnInit } from '@angular/core';

import { UserAuthService } from "../../../../services/user-auth.service";
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-under-dashboard',
  templateUrl: './under-dashboard.component.html',
  styleUrls: ['./under-dashboard.component.css']
})
export class UnderDashboardComponent implements OnInit {
  npy: Number;
  ip: Number;
  c: Number;
  show: boolean = false;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.userAuthService.getUnderDashboard().subscribe((data: any) => {
      if(data.success){
        this.npy = data.npy;
        this.ip = data.ip;
        this.c = data.c;
        this.show = true;
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
          this.show = false;
          this.router.navigate(['/user/dashboard']);
        }
      }
    });
  }

}
