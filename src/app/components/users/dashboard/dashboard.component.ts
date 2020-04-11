import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  by: boolean = true;
  under: boolean = false;
  show: boolean = false;

  constructor(
    private userAuthService: UserAuthService
  ) { }

  ngOnInit() {
    this.userAuthService.getUserRole().subscribe((data: any) => {
      if(data.role == 'Student'){
        this.show = false;
      }else{
        this.show = true;
      }
    });
  }

  viewBy(){
    this.by = true;
    this.under = false;
  }

  viewUnder(){
    this.by = false;
    this.under = true;
  }

}
