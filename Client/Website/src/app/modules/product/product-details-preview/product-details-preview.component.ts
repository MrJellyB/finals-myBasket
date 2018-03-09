import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Category } from '../../../shared/entities/Category';
import { ProductService } from '../product.service';
import { EventEmitter } from '@angular/core';
import { Product } from '../../../shared/entities/Product';

@Component({
  selector: 'app-product-details-preview',
  templateUrl: './product-details-preview.component.html',
  styleUrls: ['./product-details-preview.component.css']
})
export class ProductDetailsPreviewComponent implements OnInit {

  public categories: Category[];
  public category: number;
  select: EventEmitter<string>;
  @Input() productIdToShow: any;
  public CategoryValue: any;
  public productDetails: Product;
  public boolIsShow: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productDetails = new Product();
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
