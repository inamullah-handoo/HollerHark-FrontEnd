import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UserAuthService } from '../../../../services/user-auth.service';
import { ComplaintAuthService } from '../../../../services/complaint-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-complaint-details',
  templateUrl: './complaint-details.component.html',
  styleUrls: ['./complaint-details.component.css']
})
export class ComplaintDetailsComponent implements OnInit {
  @Input() data: any;
  id: String;
  title: String;
  category: String;
  status: String;
  user_id: String;
  dean_id: String;
  worker_id: String;
  deanMsg: String;
  workerMsg: String;
  userMsg: String;
  msg: String;
  registeredDate: String;
  completedDate: String;
  @Output() displayModify = new EventEmitter();
  @Output() displayForward = new EventEmitter();
  @Output() displayResponse = new EventEmitter();
  @Output() displayStatus = new EventEmitter();
  @Output() displayFeedback = new EventEmitter();
  @Output() displayLog = new EventEmitter();
  showBtnEdit: boolean = false;
  showBtnDelete: boolean = false;
  showBtnForward: boolean = false;
  showBtnResponse: boolean = false;
  showBtnStatus: boolean = false;
  showBtnFeedback: boolean = false;


  constructor(
    private userAuthService: UserAuthService,
    private complaintAuthService: ComplaintAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userAuthService.getUserID().subscribe((data: any) => {
      if(this.data.user_id == data.id){
        if(this.data.status == 'Not Processed Yet'){
          this.showBtnEdit = true;
          this.showBtnDelete = true;
        }else if(this.data.status == 'Completed'){
          this.showBtnFeedback = true;
        }
      }else if(this.data.worker_id == data.id && this.data.status != 'Completed'){
        this.showBtnResponse = true;
      }else if(this.data.dean_id == data.id){
        if(this.data.status != 'Completed'){
          this.showBtnForward = true;
        }
        this.showBtnStatus = true;
      }
    });
    if(this.data){
      this.userAuthService.getUserName(this.data.dean_id).subscribe((data: any) => {
        this.dean_id = data.name;
      });
      if(this.data.worker_id != 'Not Forwarded Yet'){
        this.userAuthService.getUserName(this.data.worker_id).subscribe((data: any) => {
          this.worker_id = data.name;
        });
      }else{
        this.worker_id = this.data.worker_id;
      }
      if(this.data.user_id){
        this.userAuthService.getUserName(this.data.user_id).subscribe((data: any) => {
          this.user_id = data.name;
        });
      }else{
        this.worker_id = this.data.worker_id;
      }
      this.title = this.data.title;
      this.category = this.data.category;
      this.status = this.data.status;
      this.deanMsg = this.data.deanMsg;
      this.workerMsg = this.data.workerMsg;
      this.userMsg = this.data.userMsg;
      this.msg = this.data.msg;
      this.registeredDate = this.data.registeredDate;
      this.completedDate = this.data.completedDate;
    }
  }

  modify(){
    this.displayModify.emit();
  }
  
  forward(){
    this.displayForward.emit();
  }

  response(){
    this.displayResponse.emit();
  }

  changeStatus(){
    this.displayStatus.emit();
  }

  sendFeedback(){
    this.displayFeedback.emit();
  }

  log(){
    this.displayLog.emit();
  }

  delete(){
    if(confirm("Do you want to delete it?")){
      this.complaintAuthService.deleteComplaint(this.id).subscribe((data: any) => {
        // console.log(data);
        if(data.success){
          alert(data.msg);
          // this.ngFlashMessageService.showFlashMessage({
          //   messages: [data.msg], 
          //   dismissible: false,
          //   timeout: 3000,
          //   type: 'success'
          // });
          // window.location.replace('/user/dashboard');
          location.assign('/user/dashboard');
          // this.router.navigate(['/user/dashboard']);
        }else{
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: false,
            timeout: 3000,
            type: 'danger'
          });
        }
        this.router.navigate(['/complaint/view/' + this.id]);
      });
    }
  }
}
