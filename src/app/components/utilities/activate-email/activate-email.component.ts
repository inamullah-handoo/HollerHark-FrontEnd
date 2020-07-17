import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { UserAuthService } from "../../../services/user-auth.service";

@Component({
  selector: "app-activate-email",
  templateUrl: "./activate-email.component.html",
  styleUrls: ["./activate-email.component.css"],
})
export class ActivateEmailComponent implements OnInit {
  token: String;
  msg: String;

  constructor(
    private userAuthService: UserAuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token");

    this.userAuthService.activateEmail(this.token).subscribe((data: any) => {
      if (data.success) {
        this.msg = data.msg;
      } else {
        this.msg = data.msg;
      }
    });
  }
}
