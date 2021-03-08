import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    route: ActivatedRoute,
    private sharedDataService: SharedDataService
  ) {
    route.data.subscribe((response) => {
      this.sharedDataService.setConfigs(response.webConfig);
    });
  }
}
