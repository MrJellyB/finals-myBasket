import { Component, Input, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Product, Category } from 'app/interface/entities.interface';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-product-details-preview',
  templateUrl: './product-details-preview.component.html',
  styleUrls: ['./product-details-preview.component.css']
})
export class ProductDetailsPreviewComponent {

  @Input() productIdToShow: any;

  categories: Category[];
  category: number;
  select: EventEmitter<string>;
  CategoryValue: any;
  productDetails: Product;
  boolIsShow: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productDetails = <Product>{};
    this.getProductDetails(this.productIdToShow);
  }

  getProductDetails(productId: number): any {
    this.productService.getProductDetails(productId).subscribe(
      (data) => {
        if (data) {
          this.productDetails = data[0];
          if (this.productDetails) {
            this.getCategoryById(this.productDetails.category);
          }
        }
      }
    );

    return this.productDetails;
  }

  getCategoryById(categoryId: number): any {
    this.productService.getCategory(categoryId).subscribe(
      (data) => {
        if (data) {
          this.CategoryValue = data[0];
          this.productDetails.categoryValue = this.CategoryValue.name;
          console.log(data);
        }
      }
    );

    return this.productDetails;
  }

  ngOnChanges(changes: SimpleChanges) {
    ;
    this.getProductDetails(changes.productIdToShow.currentValue);
  }

}
