import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { StatisticsService } from './shared/services/database/statistics.service';
import { LoadingService } from './shared/loading/loading.service';

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
    private router: Router,
    private statisticsService: StatisticsService,
    private loadingService: LoadingService
  ) {}

  async ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    const layout = this.sharedDataService.getLayout();
    const layout$ = this.loadingService.showLoaderUntilCompleted(layout);
    layout$.subscribe((response) => {
      this.sharedDataService.setLayout(response);
    });
    this.sharedDataService.setStatistics(
      await this.statisticsService.getStatistics().toPromise()
    );

    if (JSON.parse(localStorage.getItem('userData')) != null) {
      this.sharedDataService.setUserDetails(
        JSON.parse(localStorage.getItem('userData'))
      );
    } else {
      const date = new Date();
      const user = {
        favorites: [],
        history: [],
        categories: [],
        lastVisit: date,
      };
      this.sharedDataService.setUserDetails(user);
    }
    this.authService.autoLogin();
  }
}
