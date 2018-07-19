import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Headers, Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Basket } from 'app/interface/entities.interface';
import { url } from 'app/utils/consts';
import { HttpService } from 'app/services/http.service';
import { UsersService } from './users.service';

<<<<<<< HEAD
=======

// API Service for basket
>>>>>>> b2c3ccd5fce50e94160c61832a170aa295befa58
@Injectable()
export class BasketHandleService {

  constructor(private httpService: HttpService, private http: Http, private userService: UsersService) {

  }

  saveBasket(data: Basket): Observable<Response> {
    let currentUser = this.userService.userName().userName;
    data.userName = currentUser;

    if (currentUser != null) {
      return this.http.post(url + '/saveBasket', { data },
        this.httpService.getOptions()).map(
          data => data.json()
        );
    }
  }

  updateBasket(data: Basket): Observable<Response> {
    return this.http.post(url + '/updateBasket', { data }).map((res) => res.json());
  }

  getBasket(id: number): Observable<Response> {
    return this.http.get(url + '/getBasket/' + id).map((res) => res.json());
  }

  getBasketByUser(userName: string): Observable<Response> {
    return this.http.get(url + '/getBasketByUser', {
      params: {
        user: (userName)
      },
    }).map((data) => data.json());
  }

  getAllStores(): Observable<Response> {
    return this.http.get(url + '/getAllStores').map((data) => data.json());
  }
}

