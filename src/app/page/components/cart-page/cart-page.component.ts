// cart-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/Cart';
import { CartItem } from '../../../models/CartItem';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SearchComponent } from "../../partials/search/search.component";
import { FooterComponent } from "../../partials/footer/footer.component";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cart-page',
    standalone: true,
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss'],
    imports: [CommonModule, RouterLink, SearchComponent, MatIconModule, FooterComponent]
})
export class CartPageComponent implements OnInit {
  private cartSubscription!: Subscription;
  tableNum!:string;
  cartQuantity = 0;
  cart!: any;
  
  constructor(private cartService: CartService, private router: Router, private route:ActivatedRoute) {    
   } 

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.food.ProductId);
  }

  changeQuantity(cartItem:any, quantityInString:string){
    const quantity = parseInt(quantityInString);   
    
    this.cartService.changeQuantity(cartItem.productId.productId, quantity);
  }

  goBack(): void {
    this.router.navigate([`/menu/`+this.tableNum]); // Replace '/' with your desired back navigation route
  }

  ngOnInit(): void {    
    this.tableNum = this.route.snapshot.paramMap.get('tableNum') || '';

    this.cartSubscription = this.cartService.getCartObservable().subscribe(items => {
      this.cartQuantity = this.cartService.getCartQuantity();
    });

    this.cartService.getCartObservable().subscribe(
      res => {
        if(res){
          this.cart = res;
          console.log("cart",this.cart);
          
        }
      }
    )
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}
