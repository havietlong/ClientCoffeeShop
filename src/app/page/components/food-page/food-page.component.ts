import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { FoodService } from '../../../services/food.service';
import { RouterLink } from '@angular/router';
import { Food } from '../../../models/Food';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../partials/search/search.component';
import { HeaderComponent } from '../../partials/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../partials/footer/footer.component';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [RouterLink, CommonModule, SearchComponent, HeaderComponent, FooterComponent, MatIconModule],
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FoodPageComponent implements OnInit {
  food?: Food;
  categoryName?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        // this.food = foodService.getFoodById(params['id']);
        // if (this.food) {
        //   this.categoryName = foodService.getCategoryNameById(this.food.CategoryId);
        // } else {
        //   console.error('Food not found!');
        // }
      }
    });
  }

  ngOnInit(): void {
    console.log(this.food);
  }

  addToCart(): void {
    if (this.food) {
      this.cartService.addToCart(this.food);
      this.router.navigateByUrl('/cart-page');
    } else {
      console.error('No food item to add to cart!');
      // Optionally, show a message to the user
    }
  }

  goBack(): void {
    this.router.navigate(['/menu']); // Replace '/' with your desired back navigation route
  }
}
