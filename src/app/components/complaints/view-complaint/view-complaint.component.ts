import { Component, OnInit } from '@angular/core';

import { ComplaintAuthService } from '../../../services/complaint-auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.component.html',
  styleUrls: ['./view-complaint.component.css']
})
export class ViewComplaintComponent implements OnInit{
  id: string;
  data: any;
  displayView: boolean = false;
  displayModify: boolean = false;
  displayForward: boolean = false;
  displayResponse: boolean = false;
  displayStatus: boolean = false;
  displayFeedback: boolean = false;
  displayLog: boolean = false;
  
  constructor(
    private complaintAuthService: ComplaintAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService,
    private route: ActivatedRoute
    ) { }
    
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.complaintAuthService.viewComplaint(this.id).subscribe((data: any) => {
      if(data.success){
        this.data = data.complaint;
        this.displayView = true;
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
          this.router.navigate(['/complaint/view/' + this.id]);
        }
      }
    });
  }

  showModify(){
    this.displayView = false;
    this.displayModify = true;
    this.displayForward = false;
    this.displayResponse = false;
    this.displayStatus = false;
    this.displayFeedback = false;
    this.displayLog = false;
  }

  showView(){
    this.displayView = false;
    this.displayModify = false;
    this.displayForward = false;
    this.displayStatus = false;
    this.displayResponse = false;
    this.displayFeedback = false;
    this.displayLog = false;
    this.ngOnInit();
  }

  showForward(){
    this.displayView = false;
    this.displayModify = false;
    this.displayForward = true;
    this.displayResponse = false;
    this.displayStatus = false;
    this.displayFeedback = false;
    this.displayLog = false;
  }

  showResponse(){
    this.displayView = false;
    this.displayModify = false;
    this.displayForward = false;
    this.displayResponse = true;
    this.displayStatus = false;
    this.displayFeedback = false;
    this.displayLog = false;
  }

  showStatus(){
    this.displayView = false;
    this.displayModify = false;
    this.displayForward = false;
    this.displayResponse = false;
    this.displayStatus = true;
    this.displayFeedback = false;
    this.displayLog = false;
  }

  showFeedback(){
    this.displayView = false;
    this.displayModify = false;
    this.displayForward = false;
    this.displayResponse = false;
    this.displayStatus = false;
    this.displayFeedback = true;
    this.displayLog = false;
  }

  showLog(){
    this.displayView = false;
    this.displayModify = false;
    this.displayForward = false;
    this.displayResponse = false;
    this.displayStatus = false;
    this.displayFeedback = false;
    this.displayLog = true;
  }
}
