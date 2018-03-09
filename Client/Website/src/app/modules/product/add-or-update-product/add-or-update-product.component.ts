import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../../shared/entities/Product';
import { Category } from '../../../shared/entities/Category';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { UsersServiceService } from '../../login/users-service.service';



@Component({
  selector: 'app-add-or-update-product',
  templateUrl: './add-or-update-product.component.html',
  styleUrls: ['./add-or-update-product.component.css']
})
export class AddOrUpdateProductComponent implements OnInit {
  public product: Product;
  public categories: Category[];
  public currentCategory: number = 0;
  // 1 = addss
  // 2 = updates
  // 3 = delete
  public actionCode: number = 1;
  select: EventEmitter<string>;
  public CategoryValue: any;
  public isNeedToRouter: boolean = false;
  public buttonText: string = "הוסף מוצר";
  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersServiceService) { }

  ngOnInit() {
    this.product = new Product();
    this.product.id = 0;
    this.getCategories();
    this.select = new EventEmitter();

    this.route.params.subscribe(params => {
      let id: number = +params['id'];
      if (id) {
        this.getProductDetails(id);
        this.actionCode = 2;
      }
    })
  }

  selectItem(value) {
    this.select.emit(value);
    console.log(value);
    this.currentCategory = +value;
    this.product.category = +value;
  }

  getCategories() {
    this.productService.getCategories().subscribe((results) => {
      this.categories = Category.toCategories(results);
      console.log(this.categories);
    })
  }

  onSubmit(f: any, event: Event) {
    if (this.actionCode == 1) {
      this.saveProduct();
    }
    else if (this.actionCode == 2){
      this.updateTheProduct();
    }
    else if (this.actionCode == 3) {
      this.deleteProduct();
    }
  }

  getProductDetails(productId: number): any {
    this.productService.getProductDetails(productId).subscribe(
      (data) => {
        ;
        if (data[0] != undefined) {
          this.product = data[0];
          ;
          this.currentCategory = this.product.category;
          this.getCategoryById(this.product.category);
          console.log(this.product);
          this.product.oldPrice = this.product.price;
        }
        else {
          this.router.navigateByUrl('/page-404');
        }
      }
    );

    return this.product;
  }

  actionCodeToAdd() { this.actionCode = 1 }
  actionCodeToUpdate() { this.actionCode = 2 }
  actionCodeToDelete() { this.actionCode = 3 }

  getCategoryById(categoryId: number): any {
    this.productService.getCategory(categoryId).subscribe(
      (data) => {
        ;
        this.CategoryValue = data[0];
        this.product.categoryValue = this.CategoryValue.name;
        console.log(data);
      }
    );
  }

  saveProduct() {
    ;
      this.product.calories = +this.product.calories;
      this.product.price = +this.product.price;
      this.productService.saveProduct(this.product).subscribe((results) => {
        this.product.id = +results;
        this.actionCode = 2;
        alert('שמירת המוצר בוצעה בהצלחה, הינך עובר למסך עריכה');
        this.router.navigate(['/add-or-update-product/' + this.product.id]);
   })
  }

  updateTheProduct() {
    this.product.price = +this.product.price;
    this.productService.updateProduct(this.product).subscribe((results) => {
      alert('עדכון המוצר בוצע בהצלחה, הינך עובר לדף הראשי');
      this.router.navigate(['/']);
    })
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product).subscribe((results) => {
      alert('מחיקת המוצר בוצעה בהצלחה, הינך עובר לדף הראשי');
      this.router.navigate(['/']);
    })
  }

  userName() {
    return this.usersService.userName();
  }

  userType() {
    return this.usersService.getUserStatus();
  }

  checkManager() {
    return this.userName() != null && this.userType() == "2";
  }
}
