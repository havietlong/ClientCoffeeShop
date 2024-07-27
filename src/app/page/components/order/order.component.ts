import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/Cart';
import { CartItem } from '../../../models/CartItem';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from "../../partials/footer/footer.component";
// import {ChangeDetectionStrategy, Component} from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-order',
  standalone: true,
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  imports: [ReactiveFormsModule, CommonModule, MatIconModule, FooterComponent, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, ReactiveFormsModule]

})
export class OrderComponent implements OnInit {
  paymentForm!: FormGroup;
  cart!: any;
  tableNum!: string;
  totalPrice!: number;
  cartQuantity!: number;
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tableNum = this.route.snapshot.paramMap.get('tableNum') || '';

    this.paymentForm = this.fb.group({
      name: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      birthday: ["", [Validators.required]],
    });

    this.cartService.getCartObservable().subscribe(
      res => {
        if (res) {
          this.cart = res;
          console.log("checkOut", this.cart);

        }
      }
    )

    this.cartSubscription = this.cartService.getCartObservable().subscribe(items => {
      this.cart = items;
      this.cartQuantity = this.cartService.getCartQuantity();
      this.totalPrice = this.cartService.getTotalPrice();
    });

  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }


  // Example: Call API to process payment
 makePayment(): void {
    if (this.paymentForm.valid) {
      this.cartService.getCartObservable().subscribe(cartItems => {
        const cartDetails = cartItems.map(item => ({
          productId: item.productId,
          productQuantity: item.quantity
        }));

        const cart = {
          customerName: this.paymentForm.value.name,
          customerPhone: this.paymentForm.value.phone,
          customerBirthday: this.paymentForm.value.birthday,
          table: this.tableNum,
          status: 1,
          cartDetails: cartDetails
        };

        // Proceed with your submission logic, e.g., sending the cart object to the server
        console.log(cart);

        this.cartService.addToCartDB(cart).subscribe(
          res =>{
            if(res){
              console.log(res);
            }
          }
        )
      });
    }
  }
  goBack(): void {
    this.router.navigate([`/cart-page/`+this.tableNum]); // Replace '/' with your desired back navigation route
  }
}

