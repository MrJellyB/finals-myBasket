import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Product, Category } from '../../../interface/entities.interface';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-cheapest-prodct-by-category',
  templateUrl: './cheapest-prodct-by-category.component.html',
  styleUrls: ['./cheapest-prodct-by-category.component.css']
})
export class CheapestProdctByCategoryComponent {

  constructor(private productService: ProductService) { }

  categories: Category[];
  category: number;
  select: EventEmitter<string>;
  productIdToShow: any;
  CategoryValue: any;
  productDetails: Product;
  boolIsShow: boolean = false;

  ngOnInit() {
    this.select = new EventEmitter();
    this.productIdToShow = 0;
    this.getCategories();
  }

  getCategories() {
    this.productService.getCategories().subscribe((results: any) => {
      this.categories = results;
      console.log(this.categories);
    })
  }

  selectItem(value) {
    this.select.emit(value);
    this.category = +value;
  }

  chooseTheCheapestProduct() {
    this.productService.getCheapestProductByCategory(this.category).subscribe(
      (data) => {
        console.log(data);
        if (typeof data[0] !== 'undefined' && data[0] !== null) {
          console.log(data[0]._productId);
          this.productIdToShow = +data[0]._productId;
          this.boolIsShow = true;

        }
        else {
          this.productDetails = <Product>{};
          this.productIdToShow = {};
          this.boolIsShow = false;
        }
      }
    );
  }

  getCategoryById(categoryId: number): any {
    this.productService.getCategory(categoryId).subscribe(
      (data) => {
        this.CategoryValue = data[0];
        this.productDetails.categoryValue = this.CategoryValue.name;
        console.log(data);
      }
    );

    return this.productDetails;
  }
}
