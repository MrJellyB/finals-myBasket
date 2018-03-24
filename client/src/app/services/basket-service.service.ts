import { Injectable } from '@angular/core';
import { BasketItem, Product } from 'app/interface/entities.interface';

// TODO: Merge with the other service / get rid
@Injectable()
export class BasketService {
  static getBasket(): BasketItem[] {
    if (!localStorage.getItem("basket")) {
      console.log("null")
      return [];
    } else {
      console.log("not null");
      JSON.parse(localStorage.getItem("basket"));
    }
  }

  static setBasket(basket: BasketItem[]) {
    localStorage.setItem("basket", JSON.stringify(basket));
  }

  static addItem(product: Product) {
    let tmpBasket: BasketItem[] = this.getBasket();
    let index = tmpBasket.map((i) => i.id).indexOf(product.id)
    if (index != -1)
      tmpBasket[index].amount = +tmpBasket[index].amount + 1;
    else
      tmpBasket.push({ id: product.id, name: product.name, image: "", price: product.price, amount: 1 });

    localStorage.setItem("basket", JSON.stringify(tmpBasket));
  }

  static removeItem(product: Product) {
    let tmpBasket: BasketItem[] = JSON.parse(localStorage.getItem("basket"));
    let index = tmpBasket.map((i) => i.id).indexOf(product.id)
    if (index != -1)
      tmpBasket[index].amount -= 1;
    else
      tmpBasket.splice(index, 1);

    localStorage.setItem("basket", JSON.stringify(tmpBasket));
  }

  static removeItemIndex(index: number) {
    let tmpBasket: BasketItem[] = JSON.parse(localStorage.getItem("basket"));
    tmpBasket.splice(index, 1);

    localStorage.setItem("basket", JSON.stringify(tmpBasket));
  }

  static setItemAmount(productID: number, amount: number) {
    let tmpBasket: BasketItem[] = JSON.parse(localStorage.getItem("basket"));
    let index = tmpBasket.map((i) => i.id).indexOf(productID);
    if (index != -1)
      tmpBasket[index].amount = amount;

    localStorage.setItem("basket", JSON.stringify(tmpBasket));
  }

  static setItemAmountStable(product: Product, amount: number) {
    let tmpBasket: BasketItem[] = JSON.parse(localStorage.getItem("basket"));

    let index = tmpBasket.map((i) => i.id).indexOf(product.id);

    console.log(index);
    if (amount == 0) {
      if (index != -1)
        tmpBasket.splice(index, 1);
    }
    else {
      if (index != -1)
        tmpBasket[index].amount = amount;
      else
        tmpBasket.push(
          {
            id: product.id,
            name: product.name,
            image: "",
            price: product.price,
            amount: amount
          });
    }

    localStorage.setItem("basket", JSON.stringify(tmpBasket));
  }

  static getAllAmount(): any {
    let tmpBasket: BasketItem[] = this.getBasket();

    if (!tmpBasket || tmpBasket.length == 0) {
      return 0;
    }
    else {
      return tmpBasket.map(item => item.amount).reduce((prev, next) => prev + next);
    }
  }

  getAllAmount(): any {
    let tmpBasket: BasketItem[] = JSON.parse(localStorage.getItem("basket"));

    if (!tmpBasket || tmpBasket.length == 0) {
      return 0;
    }
    else {
      return tmpBasket.map(item => item.amount).reduce((prev, next) => prev + next);
    }
  }

  static getItemAmount(productID: number): any {
    let tmpBasket: BasketItem[] = this.getBasket();
    let index = tmpBasket.map((i) => i.id).indexOf(productID);
    if (index != -1)
      return tmpBasket[index].amount;

    return 0;
  }

  static addToBasket(product: Product) {
    //this.module.addToBaket(product);
    let tmpBasket: BasketItem[] = JSON.parse(localStorage.getItem("basket"));
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

    localStorage.setItem("basket", JSON.stringify(tmpBasket));
  }

  static removeItemByID(id: number) {
    let tmpBasket: BasketItem[] = JSON.parse(localStorage.getItem("basket"));
    let index = tmpBasket.map((i) => i.id).indexOf(id)
    if (index != -1)
      tmpBasket[index].amount -= 1;
    else
      tmpBasket.splice(index, 1);

    localStorage.setItem("basket", JSON.stringify(tmpBasket));
  }

  static isBasketEmpty() {
    if (BasketService.getBasket() == null)
      return true;

    if (typeof BasketService.getBasket() === 'undefined' || BasketService.getBasket().length == 0)
      return true;

    return false;
  }
}
