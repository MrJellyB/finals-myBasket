import { Component } from '@angular/core';
import { Http } from '@angular/http';
import * as consts from 'app/utils/consts';
import { LocalStorageService } from '../../services/localStorageService';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private http: Http,
    private localStorageService: LocalStorageService) {

  }

  getUltimateBasket() {
    const username = this.localStorageService.get('currentUser').userName;
    if (username) {
      return this.http.get(`${environment.geneticAlgoUrl}/api/main/GetBasket/${username}`)
        .map((data) => data.json())
        .subscribe((data) => console.log(data));
    }
  }
}
