import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ComplaintAuthService } from '../../../../services/complaint-auth.service';
import { ValidationService } from '../../../../services/validation.service';
import { Router, ActivatedRoute} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-response-complaint',
  templateUrl: './response-complaint.component.html',
  styleUrls: ['./response-complaint.component.css']
})
export class ResponseComplaintComponent implements OnInit {
  @Output() displayView = new EventEmitter();
  id: String;
  workerMsg: String;

  constructor(
    private complaintAuthService: ComplaintAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService,
    private route: ActivatedRoute,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  view(){
    this.displayView.emit();
  }

  responseComplaint(){
    const complaint = {
      workerMsg: this.workerMsg
    }

    if(!this.validationService.validateResponseComplaint(complaint)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Fill all the fields"], 
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
      this.router.navigate(['/complaint/view/' + this.id]);
    }else{
      this.complaintAuthService.responseComplaint(complaint, this.id).subscribe((data: any) => {
        if(!data.success){
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: false,
            timeout: 3000,
            type: 'danger'
          });
          this.router.navigate(['/complaint/view/' + this.id]);
        }else{
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: false,
            timeout: 3000,
            type: 'success'
          });
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/complaint/view/' + this.id]));
          this.displayView.emit();
        }
      });
    }
  }
}
