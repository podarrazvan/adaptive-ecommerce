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
    // !SORIN - STEP 3: inainte sa se incarce componenta asta, deja am datele
    // acum le pun unde am nevoie si facem asta O SINGURA DATA, ca e un config
    route.data.subscribe((response) => {
      this.sharedDataService.setWebsiteDetails(response.webConfig.info[0]);

      // !SORIN - DACA VREI SA ACCESEZI PROPRIETATILE
      // console.log(
      //   this.sharedDataService.getWebsiteConfigs()
      // );
    });
  }
}
