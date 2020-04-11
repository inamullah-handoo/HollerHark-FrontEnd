import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Injectable()

export class AuthGuard implements CanActivate{
    constructor(
        private userAuthService: UserAuthService,
        private router: Router
        ){}

    canActivate(){
        if(this.userAuthService.loggedIn()){
            return true;
        }else{
            this.router.navigate(['/user/login']);
            return false;
        }
    }
}