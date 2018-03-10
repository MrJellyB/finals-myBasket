import { Component, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Product, BasketItem, CommentToProduct } from '../../../interface/entities.interface';
import { ProductService } from 'app/services/product.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
    @Input() productIdToShow: number;

    productDetails: Product;
    sub: any;
    id: number;
    CategoryValue: any;
    comm: string;
    select: EventEmitter<number>;
    currGrade: number = 1;
    commentToSave: CommentToProduct;
    grades = [1, 2, 3, 4, 5]

    constructor(private productService: ProductService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.select = new EventEmitter();
        this.comm = "";
        this.commentToSave = <CommentToProduct>{};
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getProductDetails(this.id);
        })
    }

    getProductDetails(productId: number): any {
        this.productService.getProductDetails(productId).subscribe(
            (data) => {
                this.productDetails = data[0];
                this.getCategoryById(this.productDetails.category);
                console.log(this.productDetails);
            }
        );

        return this.productDetails;
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

    SelectedGrade(value) {
        this.currGrade = +value;
        this.select.emit(value);
        console.log(value);
    }

    onSubmit(f: any, event: Event) {
    }

    addComment() {
        this.commentToSave.prodctId = this.productDetails.id;
        this.commentToSave.comment = this.comm;
        this.commentToSave.grade = this.currGrade;
        this.productService.addCommentToProduct(this.commentToSave).subscribe(
            (data) => {
                this.getProductDetails(this.id);
            }
        );
    }

    addToBasket(product: Product) {
        //this.module.addToBaket(product);
        let tmpBasket: BasketItem[] = JSON.parse(localStorage.getItem("basket"));
        let index = tmpBasket.map((i) => i.id).indexOf(product.id)
        if (index != -1) {
            tmpBasket[index].amount += 1;
        }
        else {
            const basketItem: BasketItem =
                {
                    id: this.productDetails.id,
                    name: this.productDetails.name,
                    image: "",
                    price: this.productDetails.price,
                    amount: 1
                }
            tmpBasket.push(basketItem);
        }

        localStorage.setItem("basket", JSON.stringify(tmpBasket));
    }
}
