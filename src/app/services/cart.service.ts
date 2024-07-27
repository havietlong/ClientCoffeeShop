// services/cart.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface CartItem {
  productId: string;
  quantity: number;
  productName: string;
  productPrice: number;
  productDescription: string;
  categoryId: string;
  categoryName: string;
  imageUrl: string | null;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiBaseUrl = 'http://localhost:5265/api/carts';
  private items: CartItem[] = [];  
  private itemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject(this.items);

  constructor(private http:HttpClient){

  }

  getCartObservable(): Observable<CartItem[]> {
    return this.itemsSubject.asObservable();
  }

  addToCart(product: Omit<CartItem, 'quantity' | 'totalPrice'>): void {
    const item = this.items.find(item => item.productId === product.productId);
    if (item) {
      item.quantity++;
      item.totalPrice = item.quantity * item.productPrice;
    } else {
      this.items.push({ ...product, quantity: 1, totalPrice: product.productPrice });
    }
    this.itemsSubject.next(this.items);
  }

  getCartQuantity(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  removeFromCart(productId: string): void {
    this.items = this.items.filter(item => item.productId !== productId);
    this.itemsSubject.next(this.items);
  }

  changeQuantity(productId: string, quantity: number): void {
    const item = this.items.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.itemsSubject.next(this.items);
    }
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  }

  addToCartDB(receipt: any): Observable<any>{
    return this.http.post<any>(this.apiBaseUrl, receipt)
  }
}
