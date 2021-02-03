import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { SharedDataService } from './shared/services/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ecommerce';

  constructor(
    private sharedData: SharedDataService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    if (JSON.parse(localStorage.getItem('userData')) != null) {
      this.sharedData.setUserDetails(
        JSON.parse(localStorage.getItem('userData'))
      );
    } else {
      const date = new Date();
      const user = {
        favorite: [],
        history: [],
        categories: [],
        lastVisit: date,
      };
      this.sharedData.setUserDetails(user);
    }
    this.authService.autoLogin();
  }
}
