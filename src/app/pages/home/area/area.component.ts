import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  constructor() { }

  times = new Array(10);

  product={
    title:'Iphone 12 Pro Max',
    img: ['https://p1.akcdn.net/full/731721861.apple-iphone-12-pro-max-128gb.jpg'],
    category: "phones",
    key:"test",
    price: 999
  }

  ngOnInit(): void {
  }

}
