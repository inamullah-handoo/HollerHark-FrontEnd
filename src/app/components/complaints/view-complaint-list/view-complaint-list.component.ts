import { Component, OnInit } from '@angular/core';

import { ComplaintAuthService } from '../../../services/complaint-auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-view-complaint-list',
  templateUrl: './view-complaint-list.component.html',
  styleUrls: ['./view-complaint-list.component.css']
})
export class ViewComplaintListComponent implements OnInit {
  params: Array<string>;
  complaint: any;

  constructor(
    private complaintAuthService: ComplaintAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.params = (this.route.snapshot.paramMap.get('params')).split('&');
    if(this.params[1] == 'by'){
      this.complaintAuthService.viewByComplaintList(this.params[0]).subscribe((data: any) => {
        if(data.success){
          this.complaint = data.complaints;
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
            this.router.navigate(['complaint/list/' + this.route.snapshot.paramMap.get('params')]);
          }
        }
      });
    }else if(this.params[1] == 'under'){
      this.complaintAuthService.viewUnderComplaintList(this.params[0]).subscribe((data: any) => {
        if(data.success){
          this.complaint = data.complaints;
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
            this.router.navigate(['complaint/list/' + this.route.snapshot.paramMap.get('params')]);
          }
        }
      });
    }else{
      this.complaintAuthService.adminViewComplaintList(this.params[0]).subscribe((data: any) => {
        if(data.success){
          this.complaint = data.comp;
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
            this.router.navigate(['complaint/list/' + this.route.snapshot.paramMap.get('params')]);
          }
        }
      });
    }
  }

  load(c){
    let id = c.getAttribute('id');
    this.router.navigate(['complaint/view/', id]);
  }
}
