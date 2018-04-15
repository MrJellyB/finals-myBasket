import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { url } from 'app/utils/consts';
import { Product, CommentToProduct } from 'app/interface/entities.interface';
import { HttpService } from 'app/services/http.service';


@Injectable()
export class ProductService {

  constructor(private httpService: HttpService, private http: Http, private httpClient: HttpClient) { }

  getProductDetails(id: number): Observable<Response> {
    return this.http.get(url + '/getProductDetails/' + id).map((data) => data.json());
  }

  getCategory(id: number): Observable<Response> {
    return this.http.get(url + '/getCategory/' + id).map((data) => data.json());
  }

  saveProduct(data: Product): Observable<Response> {
    return this.http.post(url + '/saveProduct', { data }, this.httpService.getOptions()).map((data) => data.json());
  }

  getCategories(): Observable<Response> {
    return this.http.get(url + '/getCategories').map((data) => data.json())
  }

  getProducts(): Observable<Response> {
    return this.http.get(url + '/getProducts').map((data) => data.json())
  }

  getProductsPaging(page, limit): Observable<Response> {
    return this.http.get(url + '/getProductsPaging/' + page + '/' + limit).map((data) => data.json())
  }

  getProductsWithParamsAndPaging(page, limit, params): Observable<Response> {
    let data = { page: page, limit: limit, params: params };
    // send the params
    return this.http.post(url + '/getProductsWithParamsAndPaging', { data }, this.httpService.getOptions()).map((data) => data.json());
  }

  updateProduct(data: Product) {
    const formData: FormData = new FormData();

    formData.append('id', data.id.toString());
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('category', data.category.toString());
    formData.append('createCountry', data.createCountry);
    formData.append('company', data.company);
    formData.append('categoryValue', data.categoryValue);
    formData.append('oldPrice', data.oldPrice.toString());
    // formData.append('comments', data.comments);
    formData.append('image', data.image, data.image.name);
    return this.httpClient.post(url + '/updateProdct', formData, this.httpService.getOptions());
  }

  deleteProduct(data: Product): Observable<Response> {
    return this.http.post(url + '/deleteProduct', { data }, this.httpService.getOptions()).map((data) => data.json());
  }

  addCommentToProduct(data: CommentToProduct): Observable<Response> {
    return this.http.post(url + '/addCommentToProduct', { data }, this.httpService.getOptions()).map((data) => data.json());
  }

  getProductSize(): Observable<Response> {
    return this.http.get(url + '/getProductSize').map((data) => data.json())
  }

  getCheapestProductByCategory(data: number): Observable<Response> {
    return this.http.get(url + '/getCheapestProductByCategory/' + data).map((data) => data.json());
  }
}
