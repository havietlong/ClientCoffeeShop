import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiBaseUrl = 'http://localhost:5265/api/products';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>(`${this.apiBaseUrl}`);
  }

  getProductById(id: string): Observable<any> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // getAllFoodsBySearchTerm(searchTerm: string) {
  //   return this.getAll().filter(food => food.ProductName.toLowerCase().includes(searchTerm.toLowerCase()))
  // }

  // getAllTags(): Tag[] {
  //   return this.tags;
  // }

  // getAllFoodsByTag(tagId: number): Food[] {
  //   if (tagId === 0) { // Assuming 0 represents "All" or no specific tag
  //     return this.foods;
  //   } else {
  //     return this.foods.filter(food =>
  //       food.CategoryId == tagId
  //     );
  //   }
  // }

  // getFoodById(foodId: string): Food | undefined{
  //   return this.foods.find(food => food.ProductId === foodId);
  // }

  // getCategoryNameById(categoryId: number): string | undefined {
  //   const category = this.tags.find(tag => tag.CategoryId === categoryId);
  //   return category ? category.CategoryName : undefined;
  // }

  // getFoodsPage(pageNumber: number, pageSize: number): Food[] {
  //   const startIndex = (pageNumber - 1) * pageSize;
  //   return this.foods.slice(startIndex, startIndex + pageSize);
  // }

  // getTotalFoodsCount(): number {
  //   return this.foods.length;
  // }

}
