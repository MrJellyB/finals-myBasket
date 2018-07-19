import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from 'app/interface/entities.interface';
import { BasketService } from "app/services/basket-service.service";
import { EventService } from "app/services/event.service";
import { ProductService } from 'app/services/product.service';
import { UsersService } from 'app/services/users.service';
import * as _ from "lodash";
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
  showAlways: boolean = false;
  categoryImages = [];

  total = 0;
  page = 1;
  limit = 24;

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
    this.categoryImages[1] = _.range(1, 9 + 1);
    this.categoryImages[2] = _.range(1, 9 + 1);
    this.categoryImages[3] = _.range(1, 6 + 1);
    this.categoryImages[4] = _.range(1, 9 + 1);
    this.categoryImages[5] = _.range(1, 11 + 1);
    this.categoryImages[6] = _.range(1, 16 + 1);
    this.categoryImages[7] = _.range(1, 4 + 1);
    this.categoryImages[8] = _.range(1, 2 + 1);
    this.categoryImages[9] = _.range(1, 4 + 1);
    this.categoryImages[10] = _.range(1, 5 + 1);
    this.categoryImages[11] = _.range(1, 4 + 1);
    this.categoryImages[12] = _.range(1, 9 + 1);

    this.getProductSize();
    this.getProductsPaging();

    this.basketItemsAmount = this.basketService.getAllAmount();
    this.subs.push(
      this.eventService.observe('BASKET_ITEMS').subscribe(() => {
        this.basketItemsAmount = this.basketService.getAllAmount();
      }));

    if (window.innerWidth < 500) {
      this.showAlways = true;
    }
  }

  getProductSize() {
    this.route.params.subscribe(params => {
      this['p'] = 0;
      this.page = 1;
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
    }).add(() =>
      $(function () {
        $('[data-toggle="tooltip"]').tooltip();
      })
    )
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
          }
        })
      }
    );
  }

  updateOrDelete(productID: number) {
    this.router.navigate(['/product-list/' + this.categoryProp + "/details/" + productID + "/edit"]);
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
    ).add(() =>
      $(function () {
        $('[data-toggle="tooltip"]').tooltip();
      })
    )
  }

  basketView() {
    this.router.navigate(['/basket']);
  }

  getCategoryImage(i: number) {
    return "assets/img/categories/" + this.categoryProp + "/" + i + ".jpg";
  }

  ngAfterViewInit() {
  }
}
