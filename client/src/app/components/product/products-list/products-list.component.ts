import * as _ from "lodash";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { EventEmitter } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Product, Category, BasketItem } from 'app/interface/entities.interface';
import { ProductService } from 'app/services/product.service';
import { UsersService } from 'app/services/users.service';
import { BasketService } from "app/services/basket-service.service";
import { EventService } from "app/services/event.service";
import { CurrencyPipe } from '@angular/common';
import { Subscription } from "rxjs";

declare var $;

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent {
  products: Product[];
  productsByCategory: Product[];
  productsGroups: Product[][];
  public productSize: number;
  public categoryProp: number;
  
  total = 0;
  page = 1;
  limit = 12;

  basketItemsAmount: number;
  subs: Subscription[] = [];

  public productPaging: Product[];

  hoverIndex: number = null;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private basketService: BasketService,
    private UsersService: UsersService, ) { }

  ngOnInit() {
    //this.getProducts();
    this.getProductSize();
    this.getProductsPaging();

    this.basketItemsAmount = this.basketService.getAllAmount();
    this.subs.push(
      this.eventService.observe('BASKET_ITEMS').subscribe(() => {
        this.basketItemsAmount = this.basketService.getAllAmount();
      }));
  }

  getProductSize() {
    this.route.params.subscribe(params => {
      let category: number = +params['id'];
      this.categoryProp = category;
      this.productService.getProductSizeByCategory(category).subscribe((size: any) => {
        if (size) {
          if (size[0]) {
            this.productSize = size[0].count;
          }
        }
      })
    })
  }

  getProductsPaging(): any {
    this.route.params.subscribe(params => {
      let category: number = +params['id'];
      if (category) {
        this.productService.getProductsPagingByCategory(category, this.page, this.limit).subscribe(
          (data: any) => {
            this.products = data;
            this.productsByCategory = data;
            this.productsGroups = _.chunk(data, 4);

            this.productsByCategory = new Array<Product>();
            for (var i = 0; i < this.products.length; i++) {
              if (this.products[i].category == category) {
                this.productsByCategory.push(this.products[i]);
              }
            }
          }
        )
      }
    })
  }

  getProducts(): any {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
        this.productsByCategory = data;
        this.productsGroups = _.chunk(data, 4);
        this.route.params.subscribe(params => {
          let id: number = +params['id'];
          if (id) {
            this.productsByCategory = new Array<Product>();
            for (var i = 0; i < this.products.length; i++) {
              if (this.products[i].category == id) {
                this.productsByCategory.push(this.products[i]);
              }
            }

            $(function () {
              $('[data-toggle="tooltip"]').tooltip();
            });
          }
        })
      }
    );
  }

  updateOrDelete(productID: number) {
    this.router.navigate(['/product-list/' + this.categoryProp + "/details/" + productID + "/edit"]);
    //this.router.navigate(['/add-or-update-product/' + productID]);
  }

  addToBasket(product: Product, input: any) {
    this.basketService.addItem(product);
    this.eventService.emit('BASKET_ITEMS');
  }

  removeFromBasket(productID: number, input: any) {
    this.basketService.removeItemByID(productID);
    this.eventService.emit('BASKET_ITEMS');
  }

  deleteFromBasket(product: Product, input: any) {
    this.basketService.setItemAmountStable(product, 0);
    this.eventService.emit('BASKET_ITEMS');
  }

  setItemAmount(product: Product, event: any) {
    this.basketService.setItemAmountStable(product, +event.target.value);
    this.eventService.emit('BASKET_ITEMS');
  }

  getItemAmount(productID: number): any {
    return this.basketService.getItemAmount(productID);
  }

  enterCard(i) {
    this.hoverIndex = i;
  }

  leaveCard(i) {
    this.hoverIndex = null;
  }

  userName() {
    return this.UsersService.userName();
  }

  userType() {
    return this.UsersService.getUserStatus();
  }

  checkManager() {
    return this.userName() != null && this.userType() == "2";
  }

  showDetails(productID: number) {
    this.router.navigate(['/product-list/' + this.categoryProp + "/details/" + productID]);
  }

  getProdutImage(productID: number): string {
    return "assets/img/product/" + productID + ".jpg";
  }

  pageChanged(event) {
    let dif = event - this.page;
    if (dif == 1) {
      this.onNext();
    }
    if (dif == -1) {
      this.onPrev();
    }
    else {
      this.goToPage(event);
    }
  }

  goToPage(n: number): void {
    this.page = n;
    this.getProductPagingByPage(this.page);
  }

  onNext(): void {
    this.page++;
    this.getProductPagingByPage(this.page);
  }

  onPrev(): void {
    this.page--;
    this.getProductPagingByPage(this.page);
  }

  getProductPagingByPage(page: number) {
    this.productService.getProductsPagingByCategory(this.categoryProp, page, this.limit).subscribe(
      (data: any) => {
        this.products = data;
        this.productsByCategory = data;
        this.productsGroups = _.chunk(data, 4);

        this.productsByCategory = new Array<Product>();
        for (var i = 0; i < this.products.length; i++) {
          if (this.products[i].category == this.categoryProp) {
            this.productsByCategory.push(this.products[i]);
          }
        }
      }
    )
  }

  basketView() {
    this.router.navigate(['/basket'])
  }
}
