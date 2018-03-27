import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Headers, Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { url } from 'app/utils/consts';
import { HttpService } from 'app/services/http.service';
import { Basket } from 'app/interface/entities.interface';
import { EventService } from './event.service';
import { LocalStorageService } from './localStorageService';

@Injectable()
export class UsersService {

  token: string;
  readonly isLoggedIn$;

  constructor(private http: Http,
    private httpService: HttpService,
    private router: Router,
    private eventService: EventService,
    private localStorageService: LocalStorageService) {

    // set token if saved in local storage
    const currentUser = this.localStorageService.get('currentUser');
    this.token = currentUser && currentUser.token;
    this.isLoggedIn$ = new BehaviorSubject<boolean>(!!this.token);
  }

  // Snapshot of login state right now, if you want realtime updates you should subscribe isLoggedIn$
  get isLoggedIn() {
    return this.isLoggedIn$.value;
  };

  login(userName: string, password: string): Observable<Response> {
    return this.http.post(
      url + '/login',
      {
        "email": userName,
        "password": password
      },
      this.httpService.getOptions()
    ).pipe(
      tap(data => this.isLoggedIn$.next(true)),
      map(data => data.json())
    );
  }

  register(data: any): Observable<Response> {
    return this.http.post(url + '/register', { data }, this.httpService.getOptions()).map((data) => data.json());
  }

  getUserTypeByUserName(data: any): Observable<Response> {
    return this.http.get(url + '/getUserByUserName/' + data).map((data) => data.json());
  }

  getCurrentUser(userName: any): Observable<Response> {
    return this.http.get(url + '/getCurrentUser/' + userName).map((data) => data.json());
  }

  getAllUsers(): Observable<Response> {
    return this.http.get(url + '/getUsers').map((data) => data.json());
  }

  removeUser(data: any): Observable<Response> {
    return this.http.post(url + '/removeUser', { data }, this.httpService.getOptions()).map((data) => data.json());
  }

  saveProfileBuilder(data: any, userName: string) {
    return this.http.post(url + '/saveProfileBuilder', { data, userName }, this.httpService.getOptions()).map((data) => data.json());
  }

  changeUserTypeStatus(userName: string, statusToChange: number): Observable<Response> {
    return this.http.post(url + '/changeUserTypeStatus', { userName, statusToChange }, this.httpService.getOptions()).map((data) => data.json());
  }

  resetPassword(userName: string): Observable<Response> {
    return this.http.post(url + '/resetPassword', { userName }, this.httpService.getOptions()).map((data) => data.json());
  }

  // TODO: Complete
  loginWithAuthenticate(userName: string, password: string): Observable<boolean> {
    return this.http.post(url + '/loginWithAuthenticate', { "email": userName, "password": password }, this.httpService.getOptions())
      .pipe(map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          this.localStorageService.set('currentUser', { userName: userName, token: token });

          // return true to indicate successful login
          return true;
        }
        else {
          // return false to indicate failed login
          return false;
        }
      }), tap(data => this.isLoggedIn$.next(true)));
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    this.router.navigate(['/'])
    this.localStorageService.clear();
    this.eventService.emit('BASKET_ITEMS');
    this.isLoggedIn$.next(false);
  }

  userName() {
    return this.localStorageService.get('currentUser');
  }

  getUserStatus() {
    return this.localStorageService.get('userType');
  }

  getCities() {
    return this.http.get(url + '/getCities').map((data) => data.json());
  }
}
