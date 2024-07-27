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
  food!: any;
  categoryName?: string;
  id!: string;
  tableNum!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }



  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.tableNum = this.route.snapshot.paramMap.get('tableNum') || '';
    this.foodService.getProductById(this.id).subscribe(
      res=>{
        if(res){
          this.food = res.data;
          console.log(res);
          
        }
      }
    );
    

    if (this.food) {
      this.categoryName = this.food.categoryName;
    } else {
      console.error('Food not found!');
    }
  }

  addToCart(food:any): void {
    if (this.food) {
      this.cartService.addToCart(food);
      this.router.navigateByUrl('/cart-page/'+this.tableNum);
    } else {
      console.error('No food item to add to cart!');
      // Optionally, show a message to the user
    }
  }

  goBack(): void {
    this.router.navigate(['/menu/'+this.tableNum]); // Replace '/' with your desired back navigation route
  }
}

