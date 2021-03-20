import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {

  constructor(private route: ActivatedRoute) {
  }

  get page() { //! maybe not ok...
    return this.route.snapshot.params['page']
  }
}
