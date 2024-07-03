import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../partials/header/header.component";
import { SearchComponent } from "../../partials/search/search.component";
import { CategoryComponent } from '../../partials/category/category.component';
import { Food } from '../../../models/Food';
import { FoodService } from '../../../services/food.service';
import { CartService } from '../../../services/cart.service';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../partials/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    imports: [MatToolbarModule, MatCardModule, CommonModule, MatFormFieldModule, FormsModule, HeaderComponent, SearchComponent, CategoryComponent, RouterLink, FooterComponent, MatIconModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuComponent implements OnInit {
  foods: Food[] = [];
  currentPage: number = 1;
  pageSize: number = 4; // Số sản phẩm trên mỗi trang

  constructor(private route: ActivatedRoute, private router: Router,
    private foodService: FoodService, private cartService: CartService
  ) {
    route.params.subscribe((params) => {
      if (params['searchTerm'])
        this.foods = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
      
      else
        this.foods = foodService.getAll();
    })
  }

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    this.foods = this.foodService.getFoodsPage(page, this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.foodService.getTotalFoodsCount() / this.pageSize);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPage(this.currentPage);
    }
  }

  addToCart(foodId: string) {
    const selectedFood = this.foods.find((food) => food.ProductId === foodId);
    if (selectedFood) {
      this.cartService.addToCart(selectedFood);
      this.router.navigateByUrl('/cart-page');
    } else {
      console.error(`Food with ID ${foodId} not found.`);
    }
  }

}

