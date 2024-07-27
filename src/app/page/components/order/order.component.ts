import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/Cart';
import { CartItem } from '../../../models/CartItem';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from "../../partials/footer/footer.component";
// import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';


@Component({
    selector: 'app-order',
    standalone: true,
    templateUrl: './order.component.html',
    styleUrl: './order.component.scss',
    imports: [ReactiveFormsModule, CommonModule, MatIconModule, FooterComponent,MatFormFieldModule, MatInputModule, MatDatepickerModule]
    
})
export class OrderComponent implements OnInit {
  paymentForm!: FormGroup;
  cart!: Cart;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.paymentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      paymentMethod: new FormControl('', Validators.required)
    });

    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  makePayment(): void {
    // Example: Call API to process payment
    console.log(this.paymentForm.value);
    // Implement your payment processing logic here
  }

  goBack(): void {
    this.router.navigate(['/cart-page']); // Replace '/' with your desired back navigation route
  }
}

