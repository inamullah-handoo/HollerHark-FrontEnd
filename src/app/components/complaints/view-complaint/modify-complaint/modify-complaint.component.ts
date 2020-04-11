import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { UserAuthService } from '../../../../services/user-auth.service';
import { ComplaintAuthService } from '../../../../services/complaint-auth.service';
import { ValidationService } from '../../../../services/validation.service';
import { Router, ActivatedRoute} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';


@Component({
  selector: 'app-modify-complaint',
  templateUrl: './modify-complaint.component.html',
  styleUrls: ['./modify-complaint.component.css']
})
export class ModifyComplaintComponent implements OnInit {
  @Output() displayView = new EventEmitter();
  @Input() data;
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
  categories: Array<String>;

  constructor(
    private userAuthService: UserAuthService,
    private complaintAuthService: ComplaintAuthService,
    private validationService: ValidationService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.data){
      this.userAuthService.getCatDean().subscribe((data: any) => {
        if(data.success){
          let temp = [], k=0;
          for(let i=0; i<data.cat.length; i++){
            for(let j=0; j<data.cat[i].length; j++){
              temp[k] = data.cat[i][j];
              k++;
            }
          }
          this.categories = temp;
        }else{
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: false,
            timeout: 3000,
            type: 'danger'
          });
          this.router.navigate(['/complaint/register']);
        }
      });
      this.title = this.data.title;
      this.category = this.data.category;
      this.msg = this.data.msg;
    }
  }

  view(){
    this.displayView.emit();
  }

  updateComplaint(){
    const complaint = {
      title: this.title,
      category: this.category,
      msg: this.msg
    }
    if(!this.validationService.validateRegisterComplaint(complaint)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Please fill in all the fields'], 
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
      this.router.navigate(['/complaint/view/' + this.id]);
    }else{
      this.complaintAuthService.modifyComplaint(complaint, this.id).subscribe((data: any) => {
        if(data.success){
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: false,
            timeout: 3000,
            type: 'success'
          });
          // this.router.navigate(['/complaint/view/' + this.id]);
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/complaint/view/' + this.id]));
          this.displayView.emit();
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
