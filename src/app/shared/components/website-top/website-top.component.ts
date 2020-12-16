import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-website-top',
  templateUrl: './website-top.component.html',
  styleUrls: ['./website-top.component.scss']
})
export class WebsiteTopComponent implements OnInit {

  constructor() { }

  elements = ['phones','laptops','TV']

  ngOnInit(): void {
  }

}
