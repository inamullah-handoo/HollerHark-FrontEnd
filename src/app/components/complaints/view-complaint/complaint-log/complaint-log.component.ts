import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ComplaintAuthService } from '../../../../services/complaint-auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-complaint-log',
  templateUrl: './complaint-log.component.html',
  styleUrls: ['./complaint-log.component.css']
})
export class ComplaintLogComponent implements OnInit {
  @Input() data: any;
  @Output() displayView = new EventEmitter();

  constructor(
    private complaintAuthService: ComplaintAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  view(){
    this.displayView.emit();
  }

}
