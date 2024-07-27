// models/CartItem.ts
import { Food } from './Food';

export class CartItem {
  food!: Food;
  quantity: number = 0;
  price: number = 0; // Thêm thuộc tính price
}
