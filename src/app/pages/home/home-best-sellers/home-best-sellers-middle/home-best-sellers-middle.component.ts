import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-best-sellers-middle',
  templateUrl: './home-best-sellers-middle.component.html',
  styleUrls: ['./home-best-sellers-middle.component.scss']
})
export class HomeBestSellersMiddleComponent implements OnInit {

  constructor() { }

  product = {img:['https://static3.evomag.ro/img?file=products%2F3800%2F3800870%2F1602653498Apple+iPhone+12+Pro+Max+128GB+-+Blue.JPG&width=600&extend=white'],
            category: 'phones', title: "iPhone 12 Pro Max",price:999}

  products = [this.product, this.product, this.product, this.product];

  ngOnInit(): void {

  }

}
