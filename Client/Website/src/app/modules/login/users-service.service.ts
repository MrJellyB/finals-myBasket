import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { User } from './user-login-component/User';
import { Headers, Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { HttpService } from '../../services/httpService/http.service';
import { url } from '../../shared/Constants'
import { Router } from '@angular/router';



@Injectable()
export class UsersServiceService {

  public token: string;

  constructor(private http: Http, private httpService: HttpService, private router: Router) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(userName:string, password:string) : Observable<Response> {
    return this.http.post(
      url + '/login',
      {
        "email": userName,
        "password": password
      },
      this.httpService.getOptions()
    ).map((data) => data.json());
  }

  register(data: any): Observable<Response> {
    return this.http.post(url + '/register',{ data }, this.httpService.getOptions()).map((data) => data.json());
  }

  getUserTypeByUserName(data: any): Observable<Response> {
    return this.httpService.http.get(url + '/getUserByUserName/' + data).map((data) => data.json());
  }

  getAllUsers(): Observable<Response> {
    return this.httpService.http.get(url + '/getUsers').map((data) => data.json());
  }

  removeUser(data: any): Observable<Response> {
    return this.http.post(url + '/removeUser', { data }, this.httpService.getOptions()).map((data) => data.json());
  }

  changeUserTypeStatus(userName: string, statusToChange : number): Observable<Response> {
    return this.http.post(url + '/changeUserTypeStatus', { userName, statusToChange }, this.httpService.getOptions()).map((data) => data.json());
  }

  resetPassword(userName: string): Observable<Response> {
    return this.http.post(url + '/resetPassword', { userName}, this.httpService.getOptions()).map((data) => data.json());
  }

  loginWithAuthenticate(userName: string, password: string): Observable<boolean> {
    return this.http.post(url + '/loginWithAuthenticate', { "email": userName, "password": password }, this.httpService.getOptions())
      .map((response: Response) =>
      {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token)
        {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ userName: userName, token: token }));

          // return true to indicate successful login
          return true;
        }
        else
        {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void
  {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/'])
  }

  userName() {
    return localStorage.getItem('currentUser');
  }

  getUserStatus() {
    return localStorage.getItem('userType');
  }
}
