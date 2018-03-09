import { Component, OnInit, EventEmitter } from '@angular/core';
import { Product } from '../../../shared/entities/Product';
import { Category } from '../../../shared/entities/Category';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersServiceService } from '../../login/users-service.service';

@Component({
  selector: 'app-products-list-filter',
  templateUrl: './products-list-filter.component.html',
  styleUrls: ['./products-list-filter.component.css']
})
export class ProductsListFilterComponent implements OnInit {
  loading = false; W
  total = 0;
  page = 1;
  limit = 10000;
  public name: string;
  public products: Product[];
  public productPaging: Product[];
  public currCategory: number;
  public categories: Category[];
  select: EventEmitter<string>;
  public bigger: string;
  public smaller: string;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private usersServiceService:UsersServiceService) { }

  ngOnInit() {
    this.select = new EventEmitter();
    this.name = "";
    this.getProductsPaging();
    this.getCategories();
  }

  

  getProductsPaging(): void {
    this.loading = true;
    this.productService.getProductsPaging(this.page, this.limit).subscribe(products => {
      this.productPaging = Product.toProduct(products);
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
    this.productService.getCategories().subscribe((results) => {
      this.categories = Category.toCategories(results);

      for (var i = 0; i < this.productPaging.length; i++) {
        debugger;
        let currValue = this.categories.find(x => +x.id == this.productPaging[i].category).name
        this.productPaging[i].categoryValue = currValue;
      }
    })
  }

  goToPage(n: number): void {
    this.page = n;
    this.getProductsPaging();
  }

  onNext(): void {
    this.page++;
    this.getProductsPaging();
  }

  onPrev(): void {
    this.page--;
    this.getProductsPaging();
  }

  showDetails(productID: number) {
    this.router.navigate(['/product-details/' + productID]);
  }

  updateOrDelete(productID: number) {
    this.router.navigate(['/add-or-update-product/' + productID]);
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
}
