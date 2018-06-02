import { Component } from '@angular/core';
import { Http } from '@angular/http';
import * as consts from 'app/utils/consts';
import { LocalStorageService } from '../../services/localStorageService';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private http: Http,
    private localStorageService: LocalStorageService) {
  }
}
