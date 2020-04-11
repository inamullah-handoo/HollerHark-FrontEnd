import { Component, OnInit } from '@angular/core';

import { UserAuthService } from '../../../services/user-auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-view-user-details',
  templateUrl: './view-user-details.component.html',
  styleUrls: ['./view-user-details.component.css']
})
export class ViewUserDetailsComponent implements OnInit {
  id: String;
  user: any;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userAuthService.getUserDetails(this.id).subscribe((data: any) => {
      if(data.success){
        this.user = data.user;
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
          this.router.navigate(['/admin/user/' + this.id]);
        }
      }
    });
  }

}
