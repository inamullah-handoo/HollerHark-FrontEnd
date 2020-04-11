import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ComplaintAuthService } from '../../../../services/complaint-auth.service';
import { ValidationService } from '../../../../services/validation.service';
import { Router, ActivatedRoute} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-send-feedback',
  templateUrl: './send-feedback.component.html',
  styleUrls: ['./send-feedback.component.css']
})
export class SendFeedbackComponent implements OnInit {
  @Output() displayView = new EventEmitter();
  id: String;
  userMsg: String;

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

  usersFeedback(){
    const complaint = {
      userMsg: this.userMsg
    }
    this.complaintAuthService.userFeedback(complaint, this.id).subscribe((data: any) => {
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
