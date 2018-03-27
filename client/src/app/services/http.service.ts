import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Headers, Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { LocalStorageService } from './localStorageService';

@Injectable()
export class HttpService {

  constructor(private http: Http,
    private localStorageService: LocalStorageService) { }

  getOptions(): any {
    let header: HttpHeaders = new HttpHeaders().append("Content-Type", "application/json;charset=utf-8");
    let headers: Headers =
      new Headers(
        [{
          "Origin": "http://localhost:420dsada0",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*"
        }]
      );
    let reqOptions: RequestOptions = new RequestOptions();
    reqOptions.headers = headers;
    return reqOptions;
  }

  private jwt() {
    // create authorization header with jwt token
    let currentUser = this.localStorageService.get('currentUser');
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
