import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-new-releases',
  templateUrl: './home-new-releases.component.html',
  styleUrls: ['./home-new-releases.component.scss']
})
export class HomeNewReleasesComponent implements OnInit {

  constructor() { }
  
  products=[]

  ngOnInit(): void {

    for(let i = 0; i< 10 ; i++){
      this.products.push({title: "iPhone 12 Pro Max", cut:40, img: 'https://s1.flanco.ro/catalog/product/cache/368/image/400x400/9df78eab33525d08d6e5fb8d27136e95/1/4/143545_2_1.jpg', price: 999,category:'phones'})
    }

  }

}
