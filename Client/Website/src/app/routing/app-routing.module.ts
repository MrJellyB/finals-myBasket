
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from '../modules/login/user-login-component/user-login.component';
import { RegisterUserComponent } from '../modules/login/register-user/register-user.component';
import { ManagerPageComponent } from '../modules/login/manager-page/manager-page.component';

import { ProductDetailsComponent } from '../modules/product/product-details/product-details.component';
import { AddOrUpdateProductComponent } from '../modules/product/add-or-update-product/add-or-update-product.component';
import { DeleteProductComponent } from '../modules/product/delete-product/delete-product.component';
import { ProductsListComponent } from '../modules/product/products-list/products-list.component';
import { MainPageComponent } from '../components/main-page/main-page.component';
import { AdvertisementComponent} from '../modules/advertising/advertisement/advertisement.component'
import { AppComponent } from '../app.component'
import { BasketPageComponent } from '../modules/basket/basket-page/basket-page.component';
import { CheapestProdctByCategoryComponent } from '../modules/product/cheapest-prodct-by-category/cheapest-prodct-by-category.component';
import { ErrorPageComponent } from '../components/error-page/error-page.component'
import { PriceHistoryChartWithD3jsComponent } from '../modules/product/price-history-chart-with-d3js/price-history-chart-with-d3js.component';
import { BarChartProuctPriceComponent} from '../modules/product/bar-chart-prouct-price/bar-chart-prouct-price.component';
import { FacebookApiComponent } from '../components/facebook-api/facebook-api.component'
import { PreferredProductComponent } from '../modules/product/preferred-product/preferred-product.component';
import { WeatherComponent } from '../components/weather/weather.component';
import { ProductsListFilterComponent } from '../modules/product/products-list-filter/products-list-filter.component';
import { StatisticsMainPageComponent } from '../modules/product/statistics-main-page/statistics-main-page.component';
import { AboutDataComponent } from '../components/about-data/about-data.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'add-or-update-product', component: AddOrUpdateProductComponent },
  { path: 'add-or-update-product/:id', component: AddOrUpdateProductComponent },
  { path: 'delete-product', component: DeleteProductComponent },
  { path: 'product-list', component: ProductsListComponent },
  { path: 'product-list/:id', component: ProductsListComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'advertisement', component: AdvertisementComponent },
  { path: 'basket', component: BasketPageComponent },
  { path: 'basket/:id', component: BasketPageComponent },
  { path: 'cheapest-product', component: CheapestProdctByCategoryComponent },
  { path: 'page-404', component: ErrorPageComponent },
  { path: 'history-one-d3js/:id', component: PriceHistoryChartWithD3jsComponent },
  { path: 'history-two-chart-bar', component: BarChartProuctPriceComponent },
  { path: 'manager-page', component: ManagerPageComponent },
  { path: 'facebook-api', component: FacebookApiComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'preferred-product', component: PreferredProductComponent },
  { path: 'product-list-filter', component: ProductsListFilterComponent },
  { path: 'statistics', component: StatisticsMainPageComponent },
  { path: 'about-data', component: AboutDataComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {

}
