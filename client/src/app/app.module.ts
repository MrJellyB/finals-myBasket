import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component'
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from './shared/services/AuthGuard/auth-guard.service';
import { MainNavigatorComponent } from './components/main-navigator/main-navigator.component';
import { AppRouting } from './app.routing';
import { LoginModule } from 'app/modules/login.module';
import { ProductModule } from 'app/modules/product.module';
import { HttpService } from 'app/services/http.service';
import { BasketModule } from 'app/modules/basket.module';
import { EventService } from './services/event.service';

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
    AuthGuardService,
    EventService,
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
