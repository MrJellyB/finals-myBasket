import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BasketItemModule } from '../basket-item.module';
import { CurrencyPipe } from '@angular/common';
import { BasketService } from '../../../services/basketService/basket-service.service';
import { Basket } from '../basket';
import { BasketHandleService } from '../basket.service';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter, NgZone } from '@angular/core';
import { Store } from '../../../shared/entities/store';
import { Observable } from 'rxjs/Observable';
import { Marker } from './Market';
import { } from 'googlemaps';

//declare var google;

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.css']
})
export class BasketPageComponent implements OnInit {
  basketItems: BasketItemModule[] = BasketService.getBasket();

  title: string = 'My first AGM project';
  lat: number = 32.678418;
  lng: number = 35.409007;
  zoom: number = 15;
  public currentStreetName: string;
  public markers: Marker
  public currStore: Store;
  select: EventEmitter<string>;
  stores: Store[];
  public bAfterBasketLoaded = false;


  basket: Basket;
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

  changeMarker(lat, lng) {
    this.markers = {
      lat: lat,
      lng: lng
    }
  }

  constructor(
    private basketHandleService: BasketHandleService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) { }


  removeItem(index: number) {
    BasketService.removeItemIndex(index);
    this.basketItems = BasketService.getBasket()
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

  map: any;
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
    BasketService.setBasket([]);
    this.basketItems = BasketService.getBasket()
  }

  selectItem(value) {
    this.select.emit(value);
    this.getGeoLocation(value);
    this.currentStreetName = value;
  }

  setItemAmount(productId: number, amount: number) {
    BasketService.setItemAmount(productId, amount);
  }

  saveBasket() {
    this.basket.basketItems = this.basketItems;
    this.basket.totalPrice = this.getTotalPrice();
    this.basket.streetName = this.currentStreetName;

    if (!this.basket.id) {
      this.basket.id = 0;
    }
    if (this.basket.id == 0) {
      this.basketHandleService.saveBasket(this.basket).subscribe((results) => {
        alert('סל מספר ' + results + ' נשמר בהצלחה');
      })
    }
    else {
      this.basketHandleService.updateBasket(this.basket).subscribe((results) => {
        alert("סל " + this.basket.id + " נשמר עודכן ")
      })
    }
  }
  ngOnInit() {
    this.markers = new Marker();
    this.markers.lat = this.lat;
    this.markers.lng = this.lng;
    this.basket = new Basket();
    this.basket.id = 0;
    this.getAllStores();
    this.select = new EventEmitter();

    this.route.params.subscribe(params => {
      let id: number = +params['id'];
      if (id) {
        this.getBasket(id);
      }
    })
  }

  getAllStores() {
    this.basketHandleService.getAllStores().subscribe(
      (data) => {
        this.stores = Store.toStore(data)
      }
    )
  }

  getBasket(basketId: number): any {
    this.basketHandleService.getBasket(basketId).subscribe(
      (data) => {
        this.basket = data[0];
        if (this.basket) {
          this.basketItems = this.basket.basketItems;
          this.currentStreetName = this.basket.streetName
          localStorage.setItem("basket", JSON.stringify(this.basketItems));

          this.bAfterBasketLoaded = true;

        } else {
          this.router.navigateByUrl('/page-404');
        }
      }
    )
  }

  isBasketEmpty(): boolean {
    return BasketService.isBasketEmpty()
  }
}
