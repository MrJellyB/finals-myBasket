import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FacebookService, InitParams, UIResponse } from 'ngx-facebook';
import { FBVideoComponent } from 'ngx-facebook';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import * as $ from 'jquery';
import { FormControl } from '@angular/forms';
import { Event, User } from './data-model';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from '../../services/httpService/http.service';
import { url } from '../../shared/Constants';





@Component({
  selector: 'app-facebook-api',
  templateUrl: './facebook-api.component.html',
  styleUrls: ['./facebook-api.component.css']
})
export class FacebookApiComponent {

  @ViewChild(FBVideoComponent) video: FBVideoComponent;

  israelTweets: any[];

  constructor(private router: Router,private http: Http, private httpService: HttpService) {
  };

  ngOnInit() {
    this.getIsraelTweets();
  }

  getIsraelTweets() {
    return this.http.post(url + '/authorize', {}, this.httpService.getOptions()).subscribe((res) => {
      this.httpService.http.get(url + '/getIsraelTweets').subscribe(
        (data) => {
          this.israelTweets = data.json().data
        }
      );
    })

  }
}
