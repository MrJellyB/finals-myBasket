import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Headers, Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Basket } from 'app/interface/entities.interface';
import { url } from 'app/utils/consts';
import { HttpService } from 'app/services/http.service';


@Injectable()
export class BasketHandleService {

  constructor(private httpService: HttpService, private http: Http) { }

  saveBasket(data: Basket): Observable<Response> {
    return this.httpService.http.post(url + '/saveBasket', { data }, this.httpService.getOptions()).map((data) => data.json());
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
