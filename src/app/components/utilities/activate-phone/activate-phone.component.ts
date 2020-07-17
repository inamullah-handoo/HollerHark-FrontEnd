import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { UserAuthService } from "../../../services/user-auth.service";

@Component({
  selector: "app-activate-phone",
  templateUrl: "./activate-phone.component.html",
  styleUrls: ["./activate-phone.component.css"],
})
export class ActivatePhoneComponent implements OnInit {
  token: String;
  msg: String;

  constructor(
    private userAuthService: UserAuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token");

    this.userAuthService.activatePhone(this.token).subscribe((data: any) => {
      if (data.success) {
        this.msg = data.msg;
      } else {
        this.msg = data.msg;
      }
    });
  }
}
