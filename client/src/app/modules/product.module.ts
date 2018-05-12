import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from 'app/components/product/product-details/product-details.component';
import { AddOrUpdateProductComponent } from 'app/components/product/add-or-update-product/add-or-update-product.component';
import { ProductsListComponent } from 'app/components/product/products-list/products-list.component';
import { PaginationComponent } from 'app/components/product/pagination/pagination.component';
import { CategoryPipe } from 'app/pipes/category.pipe';
import { PricePipe } from 'app/pipes/price.pipe';
import { NamePipe } from 'app/pipes/name.pipe';
import { CheapestProdctByCategoryComponent } from 'app/components/product/cheapest-prodct-by-category/cheapest-prodct-by-category.component';
import { PriceHistoryChartWithD3jsComponent } from 'app/components/product/price-history-chart-with-d3js/price-history-chart-with-d3js.component';
import { BarChartProuctPriceComponent } from 'app/components/product/bar-chart-prouct-price/bar-chart-prouct-price.component';
import { PreferredProductComponent } from 'app/components/product/preferred-product/preferred-product.component';
import { ProductDetailsPreviewComponent } from 'app/components/product/product-details-preview/product-details-preview.component';
import { BiggerThenPipe } from 'app/pipes/bigger-then.pipe';
import { SmallerThenPipe } from 'app/pipes/smaller-then.pipe';
import { ProductsListFilterComponent } from 'app/components/product/products-list-filter/products-list-filter.component';
import { StatisticsMainPageComponent } from 'app/components/product/statistics-main-page/statistics-main-page.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from 'app/services/product.service';
import { PagerService } from 'app/components/product/products-list/pager.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRouting } from '../app.routing';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    AddOrUpdateProductComponent,
    ProductsListComponent,
    PaginationComponent,
    CategoryPipe,
    PricePipe,
    NamePipe,
    CheapestProdctByCategoryComponent,
    PriceHistoryChartWithD3jsComponent,
    BarChartProuctPriceComponent,
    PreferredProductComponent,
    ProductDetailsPreviewComponent,
    BiggerThenPipe,
    SmallerThenPipe,
    ProductsListFilterComponent,
    StatisticsMainPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    AppRouting
  ],
  providers: [
    ProductService,
    PagerService
  ],
  exports: [
    ProductDetailsComponent,
    AddOrUpdateProductComponent,
    ProductsListComponent,
    PaginationComponent
  ]
})
export class ProductModule { }
