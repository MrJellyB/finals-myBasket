import { Component, ElementRef, EventEmitter, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketItem, Category, CommentToProduct, Product } from 'app/interface/entities.interface';
import { EventService } from 'app/services/event.service';
import { LocalStorageService } from 'app/services/localStorageService';
import { ProductService } from 'app/services/product.service';
import { UsersService } from '../../../services/users.service';
import { BasketService } from "app/services/basket-service.service";

declare var $;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() productIdToShow: number;


  product: Product;
  sub: any;
  id: number;
  CategoryValue: any;
  comm: string;
  select: EventEmitter<number>;
  currGrade: number = 1;
  commentToSave: CommentToProduct;
  grades = [1, 2, 3, 4, 5]
  isEdit: boolean = false;

  // Code 1: for add product
  // code 2: for update product
  // code 3: for delete product
  // code 4: for add comment or add to basket
  actionCode: number = 1;
  categories: Category[];
  currentCategory: number = 0;
  @ViewChild('modal') modal: ElementRef;

  constructor(private productService: ProductService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private localStorageService: LocalStorageService,
    private basketService: BasketService,
  ) { }

  ngAfterViewInit() {
    if (this.id) {
      $(this.modal.nativeElement).modal('show');
      $(this.modal.nativeElement).on('hidden.bs.modal', () => this.returnToCategory());
    }
  }

  ngOnInit() {
    this.select = new EventEmitter();
    this.comm = "";
    this.commentToSave = <CommentToProduct>{};
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['productId'];
      this.isEdit = params['edit'] ? true : false;

      if (this.id) {
        this.getProductDetails(this.id);
      }
    })
    this.getCategories();
  }

  returnToCategory(): any {
    if (this.isEdit)
      this.router.navigate(['../../../'], { relativeTo: this.route });
    else
      this.router.navigate(['../../'], { relativeTo: this.route });
  }

  getProductDetails(productId: number): any {
    this.productService.getProductDetails(productId).subscribe(
      (data) => {
        this.product = data[0];
        this.currentCategory = +this.product.category;
        this.getCategoryById(+this.product.category);
        //  this.product.oldPrice = this.product.price;

        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        });
      }
    );

    return this.product;
  }

  getCategoryById(categoryId: number): any {
    this.productService.getCategory(categoryId).subscribe(
      (data) => {
        this.CategoryValue = data[0];
        //this.product.categoryValue = this.CategoryValue.name;
      }
    );

    return this.product;
  }

  SelectedGrade(value) {
    this.currGrade = +value;
    this.select.emit(value);
  }

  onSubmit(f: any, event: Event) {
    if (this.actionCode === 1) {
      this.saveProduct();
    }
    else if (this.actionCode === 2) {
      this.updateTheProduct();
    }
    else if (this.actionCode === 3) {
      this.deleteProduct();
    }
  }

  addComment() {
    this.actionCode = 4;
    this.commentToSave.prodctId = this.product.id;
    this.commentToSave.comment = this.comm;
    this.commentToSave.grade = this.currGrade;
    this.productService.addCommentToProduct(this.commentToSave).subscribe(
      (data) => {
        this.getProductDetails(this.id);
      }
    );
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

  getProdutImage(productID: number): string {
    return "assets/img/product/" + productID + ".jpg";
  }

  getCategories() {
    this.productService.getCategories().subscribe((results: any) => {
      this.categories = results
      console.log(this.categories);
    })
  }

  actionCodeToAdd() { this.actionCode = 1 }
  actionCodeToUpdate() { this.actionCode = 2 }
  actionCodeToDelete() { this.actionCode = 3 }

  saveProduct() {
    this.product.calories = +this.product.calories;
    this.product.price = +this.product.price;
    this.productService.saveProduct(this.product).subscribe((results) => {
      this.product.id = +results;
      this.actionCode = 2;
      alert('שמירת המוצר בוצעה בהצלחה, הינך עובר למסך עריכה');
      this.router.navigate(['/add-or-update-product/' + this.product.id]);
    });
  }

  updateTheProduct() {
    console.log(this.product);
    this.product.price = +this.product.price;
    this.productService.updateProduct(this.product).subscribe((results) => {
      alert('עדכון המוצר בוצע בהצלחה, הינך עובר לדף הראשי');
      this.router.navigate(['/']);
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product).subscribe((results) => {
      alert('מחיקת המוצר בוצעה בהצלחה, הינך עובר לדף הראשי');
      this.router.navigate(['/']);
    });
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

  handleFileChange(files: FileList) {
    this.product.image = files.item(0);
  }

  updateOrDelete(productID: number) {
    this.router.navigate(['/product-list/' + this.product.category + "/details/" + productID + "/edit"]);
    //this.router.navigate(['/add-or-update-product/' + productID]);
  }
}
