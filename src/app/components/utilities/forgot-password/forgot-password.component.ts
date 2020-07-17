import { Component, OnInit } from "@angular/core";

import { ValidationService } from "../../../services/validation.service";
import { UserAuthService } from "../../../services/user-auth.service";
import { NgFlashMessageService } from "ng-flash-messages";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"],
})
export class ForgotPasswordComponent implements OnInit {
  email: String;

  constructor(
    private validationService: ValidationService,
    private userAuthService: UserAuthService,
    private ngFlashMessageService: NgFlashMessageService
  ) {}

  ngOnInit() {}

  forgotPassword() {
    if (this.validationService.validateEmail(this.email)) {
      let info = {
        email: this.email,
      };
      this.userAuthService.forgotPassword(info).subscribe((data: any) => {
        if (data.success) {
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg],
            dismissible: false,
            timeout: 3000,
            type: "success",
          });
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
        messages: ["Please enter a valid email"],
        dismissible: false,
        timeout: 3000,
        type: "danger",
      });
    }
  }
}
