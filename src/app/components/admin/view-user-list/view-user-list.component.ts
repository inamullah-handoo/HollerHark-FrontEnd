import { Component, OnInit } from '@angular/core';

import { UserAuthService } from '../../../services/user-auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-view-user-list',
  templateUrl: './view-user-list.component.html',
  styleUrls: ['./view-user-list.component.css']
})
export class ViewUserListComponent implements OnInit {
  role: String;
  users: any;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get('role');
    this.userAuthService.adminViewUserList(this.role).subscribe((data: any) => {
      if(data.success){
        this.users = data.users;
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
          this.router.navigate(['/admin/userList' + this.role]);
        }
      }
    });
  }

  load(us){
    let id = us.getAttribute('id')
    this.router.navigate(['/admin/user/' + id]);
  }
}
