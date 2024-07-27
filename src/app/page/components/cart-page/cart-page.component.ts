// cart-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/Cart';
import { CartItem } from '../../../models/CartItem';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SearchComponent } from "../../partials/search/search.component";
import { FooterComponent } from "../../partials/footer/footer.component";

@Component({
    selector: 'app-cart-page',
    standalone: true,
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss'],
    imports: [CommonModule, RouterLink, SearchComponent, MatIconModule, FooterComponent]
})
export class CartPageComponent implements OnInit {
  cartQuantity = 0;
  cart!: Cart;
  
  constructor(private cartService: CartService, private router: Router) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
      console.log(this.cart);
      
    })
   }

  ngOnInit(): void {

  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.food.ProductId);
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.ProductId, quantity);
  }

  goBack(): void {
    this.router.navigate(['/menu']); // Replace '/' with your desired back navigation route
  }

}
