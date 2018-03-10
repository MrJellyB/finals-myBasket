import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from './services/httpService/http.service';
import { LoginModule } from './modules/login/login.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ProductModule } from './modules/product/product.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MainService } from './components/main.service';
import { BasketModule } from './modules/basket/basket.module';
import { ErrorPageComponent } from './components/error-page/error-page.component'
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from './shared/services/AuthGuard/auth-guard.service';
import { MainNavigatorComponent } from './components/main-navigator/main-navigator.component';
import { AppRouting } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    LoginModule,
    HttpModule,
    ProductModule,
    BasketModule,
    FormsModule,
    AppRouting
  ],
  declarations: [
    AppComponent,
    MainPageComponent,
    ErrorPageComponent,
    MainNavigatorComponent,
  ],
  providers: [
    HttpService,
    MainService,
    AuthGuardService
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
