import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../services/httpService/http.service';
import { url } from '../../shared/Constants';
import { HttpHeaders } from '@angular/common/http';
import { Headers, Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Product } from '../../shared/entities/Product';
import { CommentToProduct } from '../../shared/entities/comment-to-prodct';


@Injectable()
export class ProductService {

  constructor(private httpService: HttpService, private http: Http) { }

  getProductDetails(id : number): Observable<Response> {
    return this.httpService.http.get(url + '/getProductDetails/'+id).map((data) => data.json());
  }

  getCategory(id: number): Observable<Response> {
    return this.httpService.http.get(url + '/getCategory/' + id).map((data) => data.json());
  }

  saveProduct(data: Product): Observable<Response> {
    return this.httpService.http.post(url + '/saveProduct', { data }, this.httpService.getOptions()).map((data) => data.json());
  }

  getCategories(): Observable<Response> {
    return this.httpService.http.get(url + '/getCategories').map((data)=> data.json())
  }

  getProducts(): Observable<Response> {
    return this.httpService.http.get(url + '/getProducts').map((data) => data.json())
  }

  getProductsPaging(page, limit): Observable<Response> {
    return this.httpService.http.get(url + '/getProductsPaging/' + page + '/' + limit).map((data) => data.json())
  }

  updateProduct(data: Product): Observable<Response> {
    return this.httpService.http.post(url + '/updateProdct', { data }, this.httpService.getOptions()).map((data) => data.json());
  }

  deleteProduct(data: Product): Observable<Response> {
    return this.httpService.http.post(url + '/deleteProduct', { data }, this.httpService.getOptions()).map((data) => data.json());
  }

  addCommentToProduct(data: CommentToProduct): Observable<Response> {
    return this.httpService.http.post(url + '/addCommentToProduct', { data }, this.httpService.getOptions()).map((data) => data.json());
  }

  getCheapestProductByCategory(data: number): Observable<Response> {
    return this.httpService.http.get(url + '/getCheapestProductByCategory/' + data).map((data) => data.json());
  }
}
