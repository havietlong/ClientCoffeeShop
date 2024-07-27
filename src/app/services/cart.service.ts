// services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface CartItem {
  productId: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private itemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject(this.items);

  getCartObservable(): Observable<CartItem[]> {
    return this.itemsSubject.asObservable();
  }

  addToCart(productId: string): void {
    const item = this.items.find(item => item.productId === productId);
    if (item) {
      item.quantity++;
    } else {
      this.items.push({ productId, quantity: 1 });
    }
    this.itemsSubject.next(this.items);
  }

  removeFromCart(productId: string): void {
    const index = this.items.findIndex(item => item.productId === productId);
    if (index > -1) {
      this.items.splice(index, 1);
      this.itemsSubject.next(this.items);
    }
  }

  changeQuantity(productId: string, quantity: number): void {
    const item = this.items.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.itemsSubject.next(this.items);
    }
  }
}
