import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-most-searched',
  templateUrl: './home-most-searched.component.html',
  styleUrls: ['./home-most-searched.component.scss']
})
export class HomeMostSearchedComponent implements OnInit {

  @Input() elements: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
