import { Component, EventEmitter } from '@angular/core'; ``
import { Router, ActivatedRoute } from '@angular/router';
import { Product, Category, QueryProduct } from '../../../interface/entities.interface';
import { ProductService } from 'app/services/product.service';
import { UsersService } from 'app/services/users.service';


@Component({
  selector: 'app-products-list-filter',
  templateUrl: './products-list-filter.component.html',
  styleUrls: ['./products-list-filter.component.css']
})
export class ProductsListFilterComponent {
  loading = false;
  total = 0;
  page = 1;
  limit = 10;
  public isDataLoaded = false;
  public name: string;
  public fromPrice: number;
  public toPrice: number;
  public products: Product[];
  public productPaging: Product[];
  public currCategory: number;
  public categories: Category[];
  select: EventEmitter<string>;
  public bigger: string;
  public smaller: string;
  public productSize: number;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private UsersService: UsersService) { }

  ngOnInit() {
    this.select = new EventEmitter();
    this.name = "";
    this.getProductSize();
    this.getProductsPaging();
    this.getCategories();
  }

  getProductsPaging(): void {
    this.loading = true;
    this.productService.getProductsPaging(this.page, this.limit).subscribe((products: any) => {
      debugger;
      this.isDataLoaded = true;
      this.productPaging = products;
      console.log(products);
      this.getCategories();
      this.loading = false;
    });
  }

  selectItem(value) {
    this.select.emit(value);
    this.currCategory = value;
  }

  getCategories() {
    this.productService.getCategories().subscribe((results: any) => {
      this.categories = results;

      if (this.productPaging) {
        for (var i = 0; i < this.productPaging.length; i++) {
          let category = this.categories.find(x => +x.id == this.productPaging[i].category);
          if (category) {
            let currValue = category.name;
            this.productPaging[i].categoryValue = currValue;
          }
        }
      }
    })
  }

  goToPage(n: number): void {
    this.page = n;
    //this.getProductsPaging();
    this.getProductsWithParamsAndPaging(this.page);
  }

  onNext(): void {
    this.page++;
    //this.getProductsPaging();
    this.getProductsWithParamsAndPaging(this.page);
  }

  onPrev(): void {
    this.page--;
    //this.getProductsPaging();
    this.getProductsWithParamsAndPaging(this.page);
  }

  showDetails(productID: number, category: number) {
    this.router.navigate(['/product-list/' + category + '/details/' + productID]);
  }

  updateOrDelete(productID: number) {
    this.router.navigate(['/add-or-update-product/' + productID]);
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

  getProductSize() {
    this.productService.getProductSize().subscribe((size: any) => {
      debugger;
      if (size) {
        if (size[0]) {
          this.productSize = size[0].count;
        }
      }
    })
  }

  onClickfindProducts() {
    this.getProductsWithParamsAndPaging(1);
  }


  getProductsWithParamsAndPaging(page: number): void {
    debugger;
    let params = <QueryProduct>{};
    params.productName = this.name;
    params.toPrice = this.toPrice;
    params.fromPrice = this.fromPrice;
    params.category = this.currCategory;
    this.productService.getProductsWithParamsAndPaging(page, this.limit, params).subscribe((products: any) => {
      if (products) {
        if (products.productPaging) {
          this.productPaging = products.productPaging;
        }

        if (products.totalCountProducts[0]) {
          this.productSize = products.totalCountProducts[0].count;
        }
        this.page = 1;
        this.getCategories();
      }
    });
  }
}
