import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Headers, Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Basket } from 'app/interface/entities.interface';
import { url } from 'app/utils/consts';
import { HttpService } from 'app/services/http.service';
import { UsersService } from './users.service';


@Injectable()
export class BasketHandleService {

  isUserLoggedIn: boolean;

  constructor(private httpService: HttpService, private http: Http, private userService: UsersService) {

  }

  ngOnInit() {

  }

  saveBasket(data: Basket): Observable<Response> {
    let currentUser = this.userService.userName();

    if (currentUser != null)
      return this.httpService.http.post(url + '/saveBasket', { basket: data, user: currentUser }, this.httpService.getOptions()).map((data) => data.json());
  }

  updateBasket(data: Basket): Observable<Response> {
    return this.httpService.http.post(url + '/updateBasket', { data }, this.httpService.getOptions()).map((data) => data.json());
  }

  getBasket(id: number): Observable<Response> {
    return this.httpService.http.get(url + '/getBasket/' + id).map((data) => data.json());
  }

  getAllStores(): Observable<Response> {
    return this.httpService.http.get(url + '/getAllStores').map((data) => data.json());
  }
}

