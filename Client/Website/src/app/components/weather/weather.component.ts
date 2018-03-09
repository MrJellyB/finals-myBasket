import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FacebookService, InitParams, UIResponse } from 'ngx-facebook';
import { FBVideoComponent } from 'ngx-facebook';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import * as $ from 'jquery';
import { FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from '../../services/httpService/http.service';
import { url } from '../../shared/Constants';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public weathers: any;
  public weatherData: any;
  public urlWeather = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=a860cdfacf5911a057a1ef3d33f492e8';
  constructor(private router: Router, private http: Http, private httpService: HttpService) { }



  ngOnInit() {
    this.getWeather();
  }


  getWeather() {
    return this.http.get(this.urlWeather).subscribe((res) => {
      this.weatherData = res.json();
      this.weathers = this.weatherData.weather;
    });
  }
}
