import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SharedDataService, AuthService],
})
export class AppComponent implements OnInit {
  constructor(
    public sharedDataService: SharedDataService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.sharedDataService.setLayout(
      await this.sharedDataService.getLayout().toPromise()
    );

    if (JSON.parse(localStorage.getItem('userData')) != null) {
      this.sharedDataService.setUserDetails(
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
      this.sharedDataService.setUserDetails(user);
    }
    this.authService.autoLogin();
  }
}
