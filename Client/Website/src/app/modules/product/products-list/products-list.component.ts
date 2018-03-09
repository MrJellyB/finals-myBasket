import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../../shared/entities/Product';
import { Category } from '../../../shared/entities/Category';
import { EventEmitter } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { CategoryPipe } from '../pipes/category-pipe/category.pipe';
import { SmallerThenPipe } from '../pipes/smaller-then/smaller-then.pipe';
import { Router } from "@angular/router";
import { BasketItemModule } from "../../basket/basket-item.module";
import * as _ from "lodash";
import { BasketModule } from '../../basket/basket.module';
import { BasketService } from '../../../services/basketService/basket-service.service';
import { ActivatedRoute } from '@angular/router';
import { UsersServiceService } from '../../login/users-service.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {
  public products: Product[];
  public productsByCategory: Product[];
  public productsGroups: Product[][];

  public hoverIndex: number = null;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private usersServiceService: UsersServiceService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): any {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = Product.toProduct(data);
        this.productsByCategory = Product.toProduct(data);
        this.productsGroups = _.chunk(Product.toProduct(data), 3);

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
    return this.usersServiceService.userName();
  }

  userType() {
    return this.usersServiceService.getUserStatus();
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
