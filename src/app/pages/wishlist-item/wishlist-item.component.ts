import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss']
})
export class WishlistItemComponent implements OnInit {

  @Input() product;

  constructor() { }

  ngOnInit(): void {
  }

}
