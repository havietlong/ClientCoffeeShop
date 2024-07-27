import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  cartQuantity = 0;
  tableNum!:string;
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService, private route:ActivatedRoute) {
    
  }

  ngOnInit(): void {    
    this.cartSubscription = this.cartService.getCartObservable().subscribe(items => {
      this.cartQuantity = this.cartService.getCartQuantity();
    });

    this.tableNum = this.route.snapshot.paramMap.get('tableNum') || '';
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
