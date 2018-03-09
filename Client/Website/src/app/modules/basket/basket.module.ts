import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../services/basketService/basket-service.service';
import { BasketPageComponent } from './basket-page/basket-page.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasketHandleService } from './basket.service';
import { AgmCoreModule } from '@agm/core';
import { BasketItemModule } from './basket-item.module';
import { Product } from '../../shared/entities/Product';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPI978VLaGKj-QjmS894TuR1qhBBavZhE',
      libraries: ["places"]
    })
  ],
  providers: [BasketService, BasketHandleService],
  declarations: [BasketPageComponent]
})
export class BasketModule {

}
