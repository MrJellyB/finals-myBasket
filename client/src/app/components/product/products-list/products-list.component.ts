import * as _ from "lodash";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Product, Category, BasketItem } from '../../../interface/entities.interface';
import { EventEmitter } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { ProductService } from 'app/services/product.service';
import { UsersService } from 'app/services/users.service';
import { BasketService } from "app/services/basket-service.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent {
  public products: Product[];
  public productsByCategory: Product[];
  public productsGroups: Product[][];

  public hoverIndex: number = null;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private UsersService: UsersService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): any {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
        this.productsByCategory = data;
        this.productsGroups = _.chunk(data, 3);

        console.log(this.products);
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
    this.router.navigate(['/add-or-update-product/' + productID]);
  }

  addToBasket(product: Product, input: any) {
    //BasketService.setItemAmountStable(product, +(input.value || 0) + 1);
    BasketService.addItem(product);
  }

  removeFromBasket(productID: number, input: any) {
    BasketService.removeItemByID(productID);
  }

  deleteFromBasket(product: Product, input: any) {
    BasketService.setItemAmountStable(product, 0);
  }

  setItemAmount(product: Product, event: any) {
    debugger;
    BasketService.setItemAmountStable(product, +event.target.value);
  }

  getItemAmount(productID: number): any {
    return BasketService.getItemAmount(productID);
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
}
