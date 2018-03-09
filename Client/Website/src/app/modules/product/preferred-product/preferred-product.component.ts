import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/entities/Category';
import { ProductService } from '../product.service';
import { EventEmitter } from '@angular/core';
import { Product } from '../../../shared/entities/Product';
import { CategoryToProduct } from './category-to-product';
import { ProductToGrades } from './ProductAndGrades'

@Component({
  selector: 'app-preferred-product',
  templateUrl: './preferred-product.component.html',
  styleUrls: ['./preferred-product.component.css']
})
export class PreferredProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  public categories: Category[];
  public 
  public category: number;
  select: EventEmitter<string>;
  public productIdToShow: any;
  public CategoryValue: any;
  public productDetails: Product;
  public products: Product[];
  public boolIsShow: boolean = false;
  public categoryToProduct : Array<CategoryToProduct>

  ngOnInit() {
    this.select = new EventEmitter();
    this.productIdToShow = 0;
    this.getCategories();
    this.categoryToProduct = new Array<CategoryToProduct>();
    this.getCategoryToProductsToGrades();
  }

  getCategoryToProductsToGrades() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = Product.toProductWithComments(data);
        this.products.forEach(currProduct => {

          let curr: CategoryToProduct = new CategoryToProduct();
          curr.category = currProduct.category;
          curr.ListProductsAndGrades = new Array<ProductToGrades>();

          let productAndGrades = new ProductToGrades();
          productAndGrades.productId = currProduct.id;

          // get the total grade of the current product
          productAndGrades.TotalGrades = this.getTotalGradeByProduct(currProduct);

          // whenever the category already exists in the list
          if (!this.categoryToProduct.find(x => x.category == currProduct.category)) {
            curr.ListProductsAndGrades.push(productAndGrades);
            this.categoryToProduct.push(curr);
          }
          else {

            this.categoryToProduct.
              find(x => x.category == currProduct.category).
              ListProductsAndGrades.push(productAndGrades)
          }

        });
        ;

      }
    );
  }

  getCategories() {
    this.productService.getCategories().subscribe((results) => {
      this.categories = Category.toCategories(results);
      console.log(this.categories);
    })
  }

  getTotalGradeByProduct(product: any): number{
    let totalGrade = 0;
    if (product.comments) {
      for (var i = 0; i < product.comments.length; i++) {
        totalGrade += product.comments[i].grade;
      }
    }

    return totalGrade;
  }

  selectItem(value) {
    this.select.emit(value);
    this.category = +value;
  }

  getPreferredProduct() {
    ;
    let choosenProductId = 0;
    let max = 0;
    if (this.categoryToProduct.find(x => x.category == this.category)) {
      this.categoryToProduct.find(x => x.category == this.category).ListProductsAndGrades.forEach(
        x => {
          if (x.TotalGrades > max) {
            max = x.TotalGrades;
            choosenProductId = x.productId;
          }
        }
      )
    }
    this.productIdToShow = choosenProductId;
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
