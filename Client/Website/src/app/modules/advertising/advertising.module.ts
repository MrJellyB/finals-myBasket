import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisingService} from './advertising.service';
import { AdvertisementComponent } from './advertisement/advertisement.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [AdvertisingService],
  declarations: [AdvertisementComponent]
})
export class AdvertisingModule {
  /*
  public id: string;
  public name: string;
  public image: string;
  public price: number;

  constructor(id: string, name: string, image: string, price: number) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
  }
  */
}
