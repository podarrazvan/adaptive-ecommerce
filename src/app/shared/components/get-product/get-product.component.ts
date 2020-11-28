import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.scss']
})
export class GetProductComponent implements OnInit {

  @Input() img: string[];
  @Input() title: string;
  @Input() description: string;
  @Input() price: number;
  @Input() homepagePosition: string;
  @Input() category: string;
  @Input() key: string;

  constructor(private router: Router) { }

  characters = 100;
  btnText = "Open product";

  ngOnInit(): void {
    if (window.innerWidth < 420) {
      this.characters = 20
      this.btnText = "Open";
    }

  }

  openProduct(c: string, k: string) {
    this.router.navigate(['/product', c, k]);
  }

}
