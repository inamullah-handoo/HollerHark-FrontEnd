import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComplaintAuthService {
  localhost: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
    ) { }

  registerComplaint(complaint){
    this.userAuthService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userAuthService.authToken
      })
    };

    return this.http.post<any>(this.localhost + 'complaint/register', complaint, httpOptions);
  }

  adminViewComplaintList(status){
    this.userAuthService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userAuthService.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'complaint/adminViewList/' + status, httpOptions);
  }

  viewByComplaintList(status){
    this.userAuthService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userAuthService.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'complaint/byViewList/' + status, httpOptions);
  }

  viewUnderComplaintList(status){
    this.userAuthService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userAuthService.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'complaint/underViewList/' + status, httpOptions);
  }

  viewComplaint(id){
    this.userAuthService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userAuthService.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'complaint/view/' + id, httpOptions);
  }

  modifyComplaint(complaint, id){
    this.userAuthService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userAuthService.authToken
      })
    };

    return this.http.post<any>(this.localhost + 'complaint/edit/' + id, complaint, httpOptions);
  }

  deleteComplaint(id){
    this.userAuthService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userAuthService.authToken
      })
    };

    return this.http.delete<any>(this.localhost + 'complaint/delete/' + id, httpOptions);
  }

  forwardComplaint(complaint, id){
    this.userAuthService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userAuthService.authToken
      })
    };

    return this.http.post<any>(this.localhost + 'complaint/forward/' + id, complaint, httpOptions);
  }

  responseComplaint(complaint, id){
    this.userAuthService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userAuthService.authToken
      })
    };

    return this.http.post<any>(this.localhost + 'complaint/response/' + id, complaint, httpOptions);
  }

  changeStatus(complaint, id){
    this.userAuthService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userAuthService.authToken
      })
    };

    return this.http.post<any>(this.localhost + 'complaint/changeStatus/' + id, complaint, httpOptions);
  }

  userFeedback(complaint, id){
    this.userAuthService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userAuthService.authToken
      })
    };

    return this.http.post<any>(this.localhost + 'complaint/feedback/' + id, complaint, httpOptions);
  }
}
