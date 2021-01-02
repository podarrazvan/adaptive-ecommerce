import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss']
})
export class HomeMainComponent implements OnInit {
  
  constructor(private sharedDataService: SharedDataService) { 
    this.sharedDataService.websiteDetails.subscribe((data) => {
      // console.log(data);
      // this.categories = data.categories;
    });
  }
  
  product = {title: "iPhone 12 Pro Max", cut:40, img: 'https://s1.flanco.ro/catalog/product/cache/368/image/400x400/9df78eab33525d08d6e5fb8d27136e95/1/4/143545_2_1.jpg', price: 999}
  products = [this.product, this.product]

  categories: string[];
  

  ngOnInit(): void {
   
  }

}
