import { Component, OnInit } from '@angular/core';

import { UserAuthService } from "../../../services/user-auth.service";
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  id: string;
  mySubscription;

  constructor(
    private userAuthService: UserAuthService,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.userAuthService.getProfile().subscribe((user: any) => {
      this.user = user;
      this.id = user.id;
    }, err => {
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Something went wrong'], 
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
    });
  }
}
