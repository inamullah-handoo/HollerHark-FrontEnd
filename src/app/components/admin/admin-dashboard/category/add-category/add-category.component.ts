import { Component, OnInit } from '@angular/core';

import { UserAuthService } from "../../../../../services/user-auth.service";
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  dean_id: String;
  category: String;
  des: Array<String>;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.userAuthService.getDeanID().subscribe((data: any) => {
      if(data.success){
        this.des = data.de;
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
  }

  addCategory(){
    const cat = {
      dean_id: this.dean_id,
      category: this.category
    }
    this.userAuthService.addCategory(cat).subscribe((data: any) => {
      if(data.success){
        this.ngFlashMessageService.showFlashMessage({
          messages: [data.msg], 
          dismissible: true,
          timeout: 3000,
          type: 'success'
        });
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/admin/dashboard']));
      }else{
        if(data.unauth){
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: true,
            timeout: 3000,
            type: 'danger'
          });
          this.router.navigate(['/']);
        }else{
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: true,
            timeout: 3000,
            type: 'danger'
          });
          this.router.navigate(['/admin/dashboard']);
        }
      }
    });
  }
}
