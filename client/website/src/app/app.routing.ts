
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UserLoginComponent } from './modules/login/user-login-component/user-login.component';
import { RegisterUserComponent } from './modules/login/register-user/register-user.component';
import { ProductDetailsComponent } from './modules/product/product-details/product-details.component';
import { AddOrUpdateProductComponent } from './modules/product/add-or-update-product/add-or-update-product.component';
import { ProductsListComponent } from './modules/product/products-list/products-list.component';
import { BasketPageComponent } from './modules/basket/basket-page/basket-page.component';
import { CheapestProdctByCategoryComponent } from './modules/product/cheapest-prodct-by-category/cheapest-prodct-by-category.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { PriceHistoryChartWithD3jsComponent } from './modules/product/price-history-chart-with-d3js/price-history-chart-with-d3js.component';
import { BarChartProuctPriceComponent } from './modules/product/bar-chart-prouct-price/bar-chart-prouct-price.component';
import { PreferredProductComponent } from './modules/product/preferred-product/preferred-product.component';
import { ManagerPageComponent } from './modules/login/manager-page/manager-page.component';
import { ProductsListFilterComponent } from './modules/product/products-list-filter/products-list-filter.component';
import { ProfileBuilderComponent } from './modules/login/profile-builder/profile-builder.component';
import { StatisticsMainPageComponent } from './modules/product/statistics-main-page/statistics-main-page.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'login', component: UserLoginComponent },
    { path: 'register', component: RegisterUserComponent },
    { path: 'product-details/:id', component: ProductDetailsComponent },
    { path: 'add-or-update-product', component: AddOrUpdateProductComponent },
    { path: 'add-or-update-product/:id', component: AddOrUpdateProductComponent },
    { path: 'product-list', component: ProductsListComponent },
    { path: 'product-list/:id', component: ProductsListComponent },
    { path: 'main-page', component: MainPageComponent },
    { path: 'basket', component: BasketPageComponent },
    { path: 'basket/:id', component: BasketPageComponent },
    { path: 'cheapest-product', component: CheapestProdctByCategoryComponent },
    { path: 'page-404', component: ErrorPageComponent },
    { path: 'history-one-d3js/:id', component: PriceHistoryChartWithD3jsComponent },
    { path: 'history-two-chart-bar', component: BarChartProuctPriceComponent },
    { path: 'manager-page', component: ManagerPageComponent },
    { path: 'preferred-product', component: PreferredProductComponent },
    { path: 'product-list-filter', component: ProductsListFilterComponent },
    { path: 'statistics', component: StatisticsMainPageComponent },
    { path: 'profile-builder', component: ProfileBuilderComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);
