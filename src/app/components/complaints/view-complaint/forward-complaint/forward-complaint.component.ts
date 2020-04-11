import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { ComplaintAuthService } from '../../../../services/complaint-auth.service';
import { UserAuthService } from '../../../../services/user-auth.service';
import { ValidationService } from '../../../../services/validation.service';
import { Router, ActivatedRoute} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';


@Component({
  selector: 'app-forward-complaint',
  templateUrl: './forward-complaint.component.html',
  styleUrls: ['./forward-complaint.component.css']
})
export class ForwardComplaintComponent implements OnInit {
  @Output() displayView = new EventEmitter();
  id: String;
  worker_id: String;
  deanMsg: String;
  workers: Array<String>;

  constructor(
    private complaintAuthService: ComplaintAuthService,
    private userAuthService: UserAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService,
    private route: ActivatedRoute,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userAuthService.getWorkerNameID().subscribe((data: any) => {
      if(data.success){
        this.workers = data.users;
      }else{
        this.ngFlashMessageService.showFlashMessage({
          messages: [data.msg], 
          dismissible: false,
          timeout: 3000,
          type: 'danger'
        });
        this.router.navigate(['/complaint/view/' + this.id]);
      }
    });
  }

  view(){
    this.displayView.emit();
  }

  forwardComplaint(){
    const complaint = {
      worker_id: this.worker_id,
      deanMsg: this.deanMsg
    }
    console.log(complaint);

    if(!this.validationService.validateForwardComplaint(complaint)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Fill in all the fields"], 
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
      this.router.navigate(['/complaint/view/' + this.id]);
    }else{
      this.complaintAuthService.forwardComplaint(complaint, this.id).subscribe((data: any) => {
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
        return false;
      });
    }
  }
}
