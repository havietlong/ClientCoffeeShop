// menu.component.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    styleUrls: ['./menu.component.scss'],
    imports: [MatToolbarModule, MatCardModule, CommonModule, MatFormFieldModule, FormsModule, HeaderComponent, SearchComponent, CategoryComponent, RouterLink, FooterComponent, MatIconModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuComponent implements OnInit {
  foods: any;
  currentPage: number = 1;
  pageSize: number = 4; 

  constructor(private route: ActivatedRoute, private router: Router,
    private foodService: FoodService, private cartService: CartService
  ) {
    route.params.subscribe((params) => {
      if (params['searchTerm']){
        // this.foods = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
      }
      else{
        this.foods = foodService.getAll();
      }
    })
  }

  ngOnInit(): void {
    this.foodService.getAll().subscribe(
      (res:any)=>{
        if(res){
          console.log(res.data);
          this.foods=res.data;
        }
      },
    );
  }

  addToCart(foodId: string) {
    const selectedFood = this.foods.find((food: any) => food.ProductId === foodId);
    if (selectedFood) {
      this.cartService.addToCart(selectedFood);
      this.router.navigateByUrl('/cart-page');
    } else {
      console.error(`Food with ID ${foodId} not found.`);
    }
  }

}
