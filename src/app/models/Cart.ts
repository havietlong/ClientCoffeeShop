// models/Cart.ts
import { CartItem } from './CartItem';

export class Cart {
  items: CartItem[] = [];
  totalCount: number = 0;
  totalPrice: number = 0;
}
