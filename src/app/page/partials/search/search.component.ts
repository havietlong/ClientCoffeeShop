import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SearchService } from '../../../services/search.service';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  @Output() searchEmitter = new EventEmitter<any>();
  searchTerm = '';
  constructor(activatedRoute:ActivatedRoute,private router:Router,private searchService:SearchService) {
    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm']) this.searchTerm = params['searchTerm'];
    });
   }

  ngOnInit(): void {
  }

  search(term:string):void{
    if(term){
      this.searchService.searchRecords('products','productName',term).subscribe(
        res => {
          if(res){
            this.searchEmitter.emit(res)            
          }
        }
      )
    }else{
      this.searchEmitter.emit(null) 
    }
    
  }

}
