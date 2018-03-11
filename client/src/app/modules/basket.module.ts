import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { BasketHandleService } from 'app/services/basket.service';
import { BasketPageComponent } from 'app/components/basket/basket-page/basket-page.component';
import { BasketService } from 'app/services/basket-service.service';

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
  providers: [
    BasketService,
    BasketHandleService
  ],
  declarations: [
    BasketPageComponent
  ]
})
export class BasketModule {

}
