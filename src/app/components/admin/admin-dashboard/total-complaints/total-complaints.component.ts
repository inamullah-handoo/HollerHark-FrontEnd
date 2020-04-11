import { Component, OnInit } from '@angular/core';

import { UserAuthService } from "../../../../services/user-auth.service";
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-total-complaints',
  templateUrl: './total-complaints.component.html',
  styleUrls: ['./total-complaints.component.css']
})
export class TotalComplaintsComponent implements OnInit {
  npy: Number;
  ip: Number;
  c: Number;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.userAuthService.getAllComplaints().subscribe((data: any) => {
      if(data.success){
        this.npy = data.npy;
        this.ip = data.ip;
        this.c = data.c;
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
