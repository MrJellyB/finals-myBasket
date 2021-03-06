import { Injectable } from '@angular/core';
import { BasketItem, Product } from 'app/interface/entities.interface';
import { EventService } from './event.service';
import { LocalStorageService } from './localStorageService';

// Takes the basket data from the localStorage here
@Injectable()
export class BasketService {
  constructor(private localStorageService: LocalStorageService,
    private eventService: EventService) {

  }

  getBasket() {
    return this.localStorageService.get("basketItems");
  }

  getBasketAddress() {
    return this.localStorageService.get("streetName");
  }

  setBasket(basket: BasketItem[]) {
    this.localStorageService.set("basketItems", basket);
  }

  addItem(product: Product) {
    let tmpBasket: BasketItem[] = this.getBasket();

    if (tmpBasket) {

      let index = tmpBasket.map((i) => i.id).indexOf(product.id)
      if (index != -1) {
        tmpBasket[index].amount = +tmpBasket[index].amount + 1;
      }
      else {
        tmpBasket.push({ id: product.id, name: product.name, image: "", price: product.price, amount: 1 });
      }
      this.setBasket(tmpBasket);
    }
    else {
      let tmpBasket: BasketItem[] = [];
      tmpBasket.push({ id: product.id, name: product.name, image: "", price: product.price, amount: 1 });
      this.setBasket(tmpBasket);
    }

    this.eventService.emit('BASKET_ITEMS');
  }

  removeItem(product: Product) {
    let tmpBasket: BasketItem[] = this.getBasket();
    let index = tmpBasket.map((i) => i.id).indexOf(product.id)
    if (index != -1) {
      tmpBasket[index].amount -= 1;
    }
    else {
      tmpBasket.splice(index, 1);
    }
    this.setBasket(tmpBasket);
  }

  removeItemIndex(index: number) {
    let tmpBasket: BasketItem[] = this.getBasket();
    tmpBasket.splice(index, 1);

    this.setBasket(tmpBasket);
  }

  setItemAmount(productID: number, amount: number) {
    let tmpBasket: BasketItem[] = this.getBasket();
    let index = tmpBasket.map((i) => i.id).indexOf(productID);
    if (index != -1) {
      tmpBasket[index].amount = amount;
    }
    this.setBasket(tmpBasket);
  }

  setItemAmountStable(product: Product, amount: number) {
    let tmpBasket: BasketItem[] = this.getBasket();
    let index = tmpBasket.map((i) => i.id).indexOf(product.id);
    if (amount == 0 && index != -1) {
      tmpBasket.splice(index, 1);
    }
    else {
      if (index != -1) {
        tmpBasket[index].amount = amount;
      } else
        tmpBasket.push(
          {
            id: product.id,
            name: product.name,
            image: "",
            price: product.price,
            amount: amount
          });
    }

    this.setBasket(tmpBasket);
    this.eventService.emit('BASKET_ITEMS');
  }

  getAllAmount(): any {
    let tmpBasket: BasketItem[] = this.getBasket();
    if (!tmpBasket || tmpBasket.length == 0) {
      return 0;
    }
    else {
      return tmpBasket.map(item => item.amount).reduce((prev, next) => prev + next);
    }
  }

  getItemAmount(productID: number): any {
    let tmpBasket: BasketItem[] = this.getBasket() || [];
    let index = tmpBasket.map((i) => i.id).indexOf(productID);
    if (index != -1) {
      return tmpBasket[index].amount;
    }
    return 0;
  }

  addToBasket(product: Product) {
    let tmpBasket: BasketItem[] = this.getBasket();
    let index = tmpBasket.map((i) => i.id).indexOf(product.id)
    if (index != -1)
      tmpBasket[index].amount += 1;
    else
      tmpBasket.push({
        id: product.id,
        name: product.name,
        image: "",
        price: product.price,
        amount: 1
      });

    this.setBasket(tmpBasket);
  }

  removeItemByID(id: number) {
    let tmpBasket: BasketItem[] = this.getBasket();
    let index = tmpBasket.map((i) => i.id).indexOf(id)
    if (index != -1) {
      tmpBasket[index].amount -= 1;
    } else {
      tmpBasket.splice(index, 1);
    }

    this.setBasket(tmpBasket);
    this.eventService.emit('BASKET_ITEMS');
  }

  isBasketEmpty() {
    if (this.getBasket() == null || !this.getBasket() || this.getBasket().length == 0) {
      return true;
    }

    return false;
  }

  isProductInBasket(id: number): boolean {
    let tmpBasket: BasketItem[] = this.getBasket();
    if (tmpBasket) {
      let index = tmpBasket.map((i) => i.id).indexOf(id)
      return !!(index != -1 && tmpBasket[index].amount > 0);
    }
  }
}
