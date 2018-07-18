import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasketModule } from 'app/modules/basket.module';
import { LoginModule } from 'app/modules/login.module';
import { ProductModule } from 'app/modules/product.module';
import { HttpService } from 'app/services/http.service';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { MainNavigatorComponent } from './components/main-navigator/main-navigator.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { EventService } from './services/event.service';
import { LocalStorageService } from './services/localStorageService';
@NgModule({
  imports: [
    BrowserModule,
    LoginModule,
    HttpClientModule,
    HttpModule,
    ProductModule,
    BasketModule,
    FormsModule,
    AppRouting,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    MainPageComponent,
    ErrorPageComponent,
    MainNavigatorComponent,
  ],
  providers: [
    HttpService,
    EventService,
    LocalStorageService,
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
    MainPageComponent,
    ErrorPageComponent
  ]
})
export class AppModule { }
