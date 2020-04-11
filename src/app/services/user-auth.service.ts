import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  user: any;
  localhost: string = 'http://localhost:3000/';
  authToken: string;
  helper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  loggedIn(){
    this.loadToken();
    return !this.helper.isTokenExpired(this.authToken);
  }

  ifAdmin(){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      if(user.role == "Admin"){
        return false;
      }else{
        return true;
      }
    }
    // this.getUserRole().subscribe((data: any) => {
    //   if(data.role == "Admin"){
    //       return false;
    //     }else{
    //       return true;
    //     }
    // });
  }

  registerUser(user): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    if(user.role == "Student"){
      return this.http.post<any>(this.localhost + 'users/student/register', user, httpOptions);
    }else{
      return this.http.post<any>(this.localhost + 'users/faculty/register', user, httpOptions);
    }
  }

  authenticateUser(user): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.localhost + 'users/authenticate', user, httpOptions);
  }

  storeUserData(user, token){
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.user = user;
    this.authToken = token;
  }

  loadToken(){
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  logOut(){
    this.authToken = null;
    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  getUserID(){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'users/id', httpOptions);
  }

  getUserName(id){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'users/name/' + id, httpOptions);
  }

  getUserRole(){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'users/role', httpOptions);
  }

  getProfile(){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'users/profile', httpOptions);
  }

  updateProfile(user, id){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.post<any>(this.localhost + 'users/profile/' + id, user, httpOptions);
  }

  updatePassword(passwords, id){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.post<any>(this.localhost + 'users/changePassword/' + id, passwords, httpOptions);
  }

  getByDashboard(){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'users/byDashboard', httpOptions);
  }

  getUnderDashboard(){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'users/underDashboard', httpOptions);
  }

  getAllComplaints(){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'users/admin/complaints', httpOptions);
  }

  getAllUsers(){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'users/admin/users', httpOptions);
  }

  getCategories(){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'users/admin/category/view', httpOptions);
  }

  addCategory(cat){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.post<any>(this.localhost + 'users/admin/category/add', cat, httpOptions);
  }

  adminViewUserList(role){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'users/adminViewList/' + role, httpOptions);
  }

  getUserDetails(id){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'users/admin/user/' + id, httpOptions);
  }

  registerDean(user){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.post<any>(this.localhost + 'users/dean/register', user, httpOptions);
  }

  getCatDean(){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'users/deanCat', httpOptions);
  }

  getDeanID(){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'users/deanID', httpOptions);
  }

  getWorkerNameID(){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.get<any>(this.localhost + 'users/workerNameID', httpOptions);
  }
}
