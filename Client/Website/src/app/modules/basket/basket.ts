import { BasketItemModule } from './basket-item.module';


export class Basket {
  basketItems: BasketItemModule[];
  totalPrice: number;
  id: number;
  streetName: string;
}
