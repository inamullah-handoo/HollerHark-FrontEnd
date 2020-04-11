import { Component, OnInit } from '@angular/core';

import { UserAuthService } from "../../services/user-auth.service";
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
  }

  logOut(){
    this.userAuthService.logOut();
    this.ngFlashMessageService.showFlashMessage({
      messages: ["You are successfully logged out"], 
      dismissible: false,
      timeout: 3000,
      type: 'success'
    });
    this.router.navigate(['/user/login']);
    return false;
  }

}
