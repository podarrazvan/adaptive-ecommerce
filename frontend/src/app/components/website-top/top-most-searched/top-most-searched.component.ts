import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-most-searched',
  templateUrl: './top-most-searched.component.html',
  styleUrls: ['./top-most-searched.component.scss']
})
export class TopMostSearchedComponent {

  @Input() elements: string[];

}
