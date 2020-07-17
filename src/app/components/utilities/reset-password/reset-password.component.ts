import { Component, OnInit } from "@angular/core";

import { ValidationService } from "../../../services/validation.service";
import { UserAuthService } from "../../../services/user-auth.service";
import { NgFlashMessageService } from "ng-flash-messages";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  newPassword: String;
  token: String = this.route.snapshot.paramMap.get("token");
  show: Boolean = false;
  constructor(
    private validationService: ValidationService,
    private userAuthService: UserAuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.userAuthService.checkToken(this.token).subscribe((data: any) => {
      if (data.success) {
        this.show = true;
      } else {
        this.show = false;
      }
    });
  }

  resetPassword() {
    if (this.validationService.validatePassword(this.newPassword)) {
      let info = {
        newPassword: this.newPassword,
      };
      this.userAuthService
        .resetPassword(info, this.token)
        .subscribe((data: any) => {
          console.log(data);
          if (data.success) {
            this.ngFlashMessageService.showFlashMessage({
              messages: [data.msg],
              dismissible: false,
              timeout: 3000,
              type: "success",
            });
            this.router.navigate(["/user/login"]);
          } else {
            this.ngFlashMessageService.showFlashMessage({
              messages: [data.msg],
              dismissible: false,
              timeout: 3000,
              type: "danger",
            });
          }
        });
    } else {
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Enter the new Password"],
        dismissible: false,
        timeout: 3000,
        type: "danger",
      });
    }
  }
}
