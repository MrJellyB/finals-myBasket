import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Marker, BasketItem, Basket, Store } from 'app/interface/entities.interface';
import { } from 'googlemaps';
import { BasketHandleService } from 'app/services/basket.service';
import { BasketService } from 'app/services/basket-service.service';
import { EventService } from 'app/services/event.service';
import { Subscription } from 'rxjs';
import { UsersService } from 'app/services/users.service';
import { LocalStorageService } from 'app/services/localStorageService';
import { Http } from '@angular/http';
import * as consts from 'app/utils/consts';
@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.css']
})
export class BasketPageComponent {
  basketItems: BasketItem[];
  title: string = 'My first AGM project';
  lat: number = 32.678418;
  lng: number = 35.409007;
  zoom: number = 15;
  currentStreetName: string = this.basketService.getBasketAddress();
  marker: Marker;
  currStore: Store;
  select: EventEmitter<string>;
  stores: Store[];
  bAfterBasketLoaded = false;
  basket: Basket;
  map: any;
  isLoggedIn: boolean = this.userService.isLoggedIn;
  showSpinner: boolean;

  constructor(
    private http: Http,
    private basketHandleService: BasketHandleService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private eventService: EventService,
    private basketService: BasketService,
    private localStorageService: LocalStorageService,
    private userService: UsersService) { }

  ngOnInit() {

    this.showSpinner = false;
    this.basketItems = this.basketService.getBasket();

    this.marker = { lat: this.lat, lng: this.lng };
    this.basket = <Basket>{};
    this.getAllStores();
    this.select = new EventEmitter();

    this.route.params.subscribe(params => {
      let id: number = +params['id'];
      if (id) {
        this.getBasket(id);
      }
    });
  }

  getTotalPrice() {
    var totalPrice: number = 0;
    for (var i = 0; i < this.basketItems.length; i++) {
      totalPrice += this.basketItems[i].price * this.basketItems[i].amount;
    }
    return totalPrice;
  }

  mapClicked($event: any) {
    this.changeMarker($event.coords.lat, $event.coords.lng);
  }
  // change marker
  changeMarker(lat, lng) {
    this.marker = {
      lat: lat,
      lng: lng
    }
  }

  removeItem(index: number) {
    this.basketService.removeItemIndex(index);
    this.basketItems = this.basketService.getBasket();
    this.eventService.emit('BASKET_ITEMS');
  }

  callback(results, status) {
    this.ngZone.run(() => {
      let place: google.maps.places.PlaceResult;

      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          place = results[i];
          //createMarker(results[i]);
        }
      }

      //verify result
      if (place.geometry === undefined || place.geometry === null) {
        return;
      }

      //set latitude, longitude and zoom
      this.lat = place.geometry.location.lat();
      this.lng = place.geometry.location.lng();
      this.zoom = 15;
    });
  }

  mapReady($event: any) {
    // here $event will be of type google.maps.Map
    // and you can put your logic here to get lat lng for marker. I have just put a sample code. You can refactor it the way you want.
    this.map = $event;

    if (this.bAfterBasketLoaded) {
      this.getGeoLocation(this.currentStreetName);
    }

  }

  getGeoLocation(address: string) {
    var service = new google.maps.places.PlacesService(this.map);

    var request = {
      query: address
    };

    service.textSearch(request, this.callback.bind(this));
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  emptyBasket() {
    this.basketService.setBasket([]);
    this.basketItems = this.basketService.getBasket()
  }

  selectItem(value) {
    this.select.emit(value);
    this.getGeoLocation(value);
    this.currentStreetName = value;
  }

  setItemAmount(productId: number, amount: number) {
    this.basketService.setItemAmount(productId, amount);
    this.eventService.emit('BASKET_ITEMS');
  }

  saveBasket() {
    this.basket.basketItems = this.basketItems;
    this.basket.totalPrice = this.getTotalPrice();
    this.basket.streetName = this.currentStreetName;
    const basketId = this.localStorageService.get("basketId");
    this.localStorageService.set("streetName", this.currentStreetName);


    if (!basketId) {
      this.basketHandleService.saveBasket(this.basket).subscribe((res) => {
        this.localStorageService.set("basketId", res);
        alert('הסל נשמר בהצלחה');
      });
    } else {
      this.basket.id = +basketId;
      this.basketHandleService.updateBasket(this.basket).subscribe((res) => {
        alert('הסל עודכן בהצלחה');
      });
    }
  }

  getAllStores() {
    this.basketHandleService.getAllStores().subscribe(
      (data: any) => {
        //this.stores = Store.toStore(data)
        this.stores = data
      }
    )
  }

  getBasket(basketId: number): any {
    this.basketHandleService.getBasket(basketId).subscribe(
      (data) => {
        this.basket = data[0];
        if (this.basket) {
          this.basketItems = this.basket.basketItems;
          this.currentStreetName = this.basket.streetName;
          this.localStorageService.set("basketItems", this.basketItems);
          this.bAfterBasketLoaded = true;

        } else {
          this.router.navigateByUrl('/page-404');
        }
      }
    )
  }

  isBasketEmpty(): boolean {
    return this.basketService.isBasketEmpty()
  }

  buildSmartBasket() {
    this.showSpinner = true;

    const username = this.localStorageService.get('currentUser').userName;
    if (username) {
      this.http.get(`${consts.geneticAlgoUrl}/${username}`)
        .map((data) => data.json())
        .subscribe((data) => {
          this.showSpinner = false;
          this.basketService.setBasket(data.basketItems);
          this.basketItems = data.basketItems;
        });
    }
  }
}
