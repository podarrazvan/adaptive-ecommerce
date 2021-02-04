import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
    private authService: AuthService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)) {
        return;
      } 
      window.scrollTo(0,0);
    });
    
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
