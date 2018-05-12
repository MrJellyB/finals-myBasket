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

  total = 0;
  page = 1;
  limit = 10;

  public productPaging: Product[];

  hoverIndex: number = null;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private basketService: BasketService,
    private UsersService: UsersService, ) { }

  ngOnInit() {
    this.getProducts();
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
    this.router.navigate(['/add-or-update-product/' + productID]);
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
    this.router.navigate(['/product-details/' + productID]);
  }

  getProdutImage(productID: number): string {
    return "assets/img/product/" + productID + ".jpg";
  }

  /*
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
  }*/
}
