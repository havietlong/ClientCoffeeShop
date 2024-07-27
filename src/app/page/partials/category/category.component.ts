import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tag } from '../../../models/Tag';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{
  tags?:Tag[];
  constructor(foodService:FoodService) {
    // this.tags = foodService.getAllTags();
   }

  ngOnInit(): void {
  }

}
