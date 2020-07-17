import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoginComponent } from "./components/users/login/login.component";
import { UserRegisterComponent } from "./components/users/user-register/user-register.component";
import { ProfileComponent } from "./components/users/profile/profile.component";
import { ViewProfileComponent } from "./components/users/profile/view-profile/view-profile.component";
import { ModifyProfileComponent } from "./components/users/profile/modify-profile/modify-profile.component";
import { ChangePasswordComponent } from "./components/users/profile/change-password/change-password.component";
import { ComplaintRegisterComponent } from "./components/complaints/complaint-register/complaint-register.component";
import { DashboardComponent } from "./components/users/dashboard/dashboard.component";
import { ByDashboardComponent } from "./components/users/dashboard/by-dashboard/by-dashboard.component";
import { UnderDashboardComponent } from "./components/users/dashboard/under-dashboard/under-dashboard.component";
import { ViewComplaintListComponent } from "./components/complaints/view-complaint-list/view-complaint-list.component";
import { ViewComplaintComponent } from "./components/complaints/view-complaint/view-complaint.component";
import { ComplaintDetailsComponent } from "./components/complaints/view-complaint/complaint-details/complaint-details.component";
import { ModifyComplaintComponent } from "./components/complaints/view-complaint/modify-complaint/modify-complaint.component";
import { ForwardComplaintComponent } from "./components/complaints/view-complaint/forward-complaint/forward-complaint.component";
import { ResponseComplaintComponent } from "./components/complaints/view-complaint/response-complaint/response-complaint.component";
import { ChangeStatusComponent } from "./components/complaints/view-complaint/change-status/change-status.component";
import { SendFeedbackComponent } from "./components/complaints/view-complaint/send-feedback/send-feedback.component";
import { ComplaintLogComponent } from "./components/complaints/view-complaint/complaint-log/complaint-log.component";
import { AdminDashboardComponent } from "./components/admin/admin-dashboard/admin-dashboard.component";
import { TotalComplaintsComponent } from "./components/admin/admin-dashboard/total-complaints/total-complaints.component";
import { TotalUsersComponent } from "./components/admin/admin-dashboard/total-users/total-users.component";
import { CategoryComponent } from "./components/admin/admin-dashboard/category/category.component";
import { AddCategoryComponent } from "./components/admin/admin-dashboard/category/add-category/add-category.component";
import { ViewCategoriesComponent } from "./components/admin/admin-dashboard/category/view-categories/view-categories.component";
import { ViewUserListComponent } from "./components/admin/view-user-list/view-user-list.component";
import { ViewUserDetailsComponent } from "./components/admin/view-user-details/view-user-details.component";
import { DeanRegisterComponent } from "./components/admin/dean-register/dean-register.component";
import { ForgotPasswordComponent } from "./components/utilities/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/utilities/reset-password/reset-password.component";
import { ActivateEmailComponent } from "./components/utilities/activate-email/activate-email.component";
import { ActivatePhoneComponent } from "./components/utilities/activate-phone/activate-phone.component";

import { ValidationService } from "./services/validation.service";
import { ComplaintAuthService } from "./services/complaint-auth.service";
import { UserAuthService } from "./services/user-auth.service";
import { AuthGuard } from "./guard/auth.guard";

import { NgFlashMessagesModule } from "ng-flash-messages";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "resetpassword/:token", component: ResetPasswordComponent },
  { path: "user/register", component: UserRegisterComponent },
  { path: "user/login", component: LoginComponent },
  { path: "user/forgotpassword", component: ForgotPasswordComponent },
  { path: "user/activate/email/:token", component: ActivateEmailComponent },
  { path: "user/activate/phone/:token", component: ActivatePhoneComponent },
  {
    path: "user/profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "user/dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/dashboard",
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/userList/:role",
    component: ViewUserListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/user/:id",
    component: ViewUserDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/dean/register",
    component: DeanRegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "complaint/register",
    component: ComplaintRegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "complaint/list/:params",
    component: ViewComplaintListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "complaint/view/:id",
    component: ViewComplaintComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "/" },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    UserRegisterComponent,
    HomeComponent,
    ProfileComponent,
    ViewProfileComponent,
    ModifyProfileComponent,
    ChangePasswordComponent,
    ComplaintRegisterComponent,
    DashboardComponent,
    ByDashboardComponent,
    UnderDashboardComponent,
    ViewComplaintListComponent,
    ViewComplaintComponent,
    ComplaintDetailsComponent,
    ModifyComplaintComponent,
    ForwardComplaintComponent,
    ResponseComplaintComponent,
    ChangeStatusComponent,
    SendFeedbackComponent,
    ComplaintLogComponent,
    AdminDashboardComponent,
    TotalComplaintsComponent,
    TotalUsersComponent,
    CategoryComponent,
    AddCategoryComponent,
    ViewCategoriesComponent,
    ViewUserListComponent,
    ViewUserDetailsComponent,
    DeanRegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ActivateEmailComponent,
    ActivatePhoneComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    NgFlashMessagesModule.forRoot(),
  ],
  providers: [
    ValidationService,
    ComplaintAuthService,
    UserAuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
