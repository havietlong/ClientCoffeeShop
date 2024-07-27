import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-gt',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gt.component.html',
  styleUrl: './gt.component.scss'
})
export class GtComponent {
  tableNum!: string;

  constructor(private route:ActivatedRoute){
    
  }

  ngOnInit(){
    this.tableNum = this.route.snapshot.paramMap.get('tableNum') || '';
    console.log(this.tableNum);    
  }
}
