import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from './services/httpService/http.service';
import { LoginModule } from './modules/login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module'
import { HttpModule } from '@angular/http';
import { ProductModule } from './modules/product/product.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AdvertisingModule } from './modules/advertising/advertising.module';
import { MainService } from './components/main.service';
import { BasketModule } from './modules/basket/basket.module';
import { ErrorPageComponent } from './components/error-page/error-page.component'
import { FormsModule } from '@angular/forms';
import { FacebookApiComponent } from './components/facebook-api/facebook-api.component';
import { FacebookModule } from 'ngx-facebook';
import { WeatherComponent } from './components/weather/weather.component';
import { SocketsComponent } from './components/sockets/sockets.component';
import { AuthGuardService } from './shared/services/AuthGuard/auth-guard.service';
import { MainNavigatorComponent } from './components/main-navigator/main-navigator.component';
import { AboutDataComponent } from './components/about-data/about-data.component'

//import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpModule,
    ProductModule,
    AdvertisingModule,
    BasketModule,
    FormsModule,
    FacebookModule.forRoot()
    /*
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_KEY'
    })*/
  ],
  declarations: [
    AppComponent,
    MainPageComponent,
    ErrorPageComponent,
    FacebookApiComponent,
    WeatherComponent,
    SocketsComponent,
    MainNavigatorComponent,
    AboutDataComponent
  ],
  providers: [HttpService, MainService, AuthGuardService],
  bootstrap: [AppComponent],
  exports: [MainPageComponent, ErrorPageComponent, FacebookApiComponent]
})
export class AppModule { }
