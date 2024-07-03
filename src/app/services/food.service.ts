import { Injectable } from '@angular/core';
import { cate, food } from '../../data';
import { Food } from '../models/Food';
import { Tag } from '../models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foods: Food[] = food; // Assuming `food` is an array of Food objects from your data file
  private tags: Tag[] = cate; // Assuming you have a way to populate tags

  constructor() { }

  getAll(): Food[] {
    return this.foods;
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter(food => food.ProductName.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  getAllTags(): Tag[] {
    return this.tags;
  }

  getAllFoodsByTag(tagId: number): Food[] {
    if (tagId === 0) { // Assuming 0 represents "All" or no specific tag
      return this.foods;
    } else {
      return this.foods.filter(food =>
        food.CategoryId == tagId
      );
    }
  }

  getFoodById(foodId: string): Food | undefined{
    return this.foods.find(food => food.ProductId === foodId);
  }

  getCategoryNameById(categoryId: number): string | undefined {
    const category = this.tags.find(tag => tag.CategoryId === categoryId);
    return category ? category.CategoryName : undefined;
  }

  getFoodsPage(pageNumber: number, pageSize: number): Food[] {
    const startIndex = (pageNumber - 1) * pageSize;
    return this.foods.slice(startIndex, startIndex + pageSize);
  }

  getTotalFoodsCount(): number {
    return this.foods.length;
  }

}
