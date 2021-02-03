import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-quick-menu',
  templateUrl: './footer-quick-menu.component.html',
  styleUrls: ['./footer-quick-menu.component.scss']
})
export class FooterQuickMenuComponent implements OnInit {

  constructor() { }

  categories = ['Phones', 'Laptops', 'Audio', 'Video', 'TV\'s'];
  
  ngOnInit(): void {
  }

}
