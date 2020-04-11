import { Component, OnInit } from '@angular/core';

import { UserAuthService } from "../../../../../services/user-auth.service";
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  op: Array<String>;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.userAuthService.getCategories().subscribe((data: any) => {
      if(data.success){
        let op = [], k = 0;
        for(let i=0; i<data.de.length; i++){
          if(data.cat[i]){
            for(let j=0; j<data.cat[i].length; j++){
              let de = data.de[i];
              let cat = data.cat[i][j];
              op[k] = {i: k+1, de, cat};
              k++;
          }
          }
        }
        this.op = op;
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
          this.router.navigate(['/admin/dashboard']);
        }
      }
    });
  }

}
