import { SharedDataService } from './../../shared/services/shared-data.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from './admin.service';
import { buildAdminFormGroup } from './admin.form-builder';
import { buildProductFormGroup } from './admin-form.helpers';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';
import { StatisticsService } from 'src/app/shared/services/database/statistics.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  nothingSelected = true;

  constructor(
    private activeRouter: ActivatedRoute,
    private configsService: ConfigsService,
    private sharedDataService: SharedDataService,
    private adminService: AdminService,
    private statisticsService: StatisticsService
  ) {
    this.adminService.adminFormGroup = buildAdminFormGroup();
    this.adminService.productFormGroup = buildProductFormGroup();

    this.sharedDataService.layout$.subscribe((layout) => {
      if (layout._id === undefined) {
        this.configsService.createconfigs();
      }
      setTimeout(() => {
        // ! not ok, fix it!
        this.sharedDataService.statistics$.subscribe((statistics) => {
          if (statistics === null) {
            this.statisticsService.createStatistics().subscribe();
          }
        });
      }, 300);
    });
  }

  // TODO use observable!
  ngDoCheck(): void {
    this.checkUrl();
  }

  checkUrl(): void {
    const activeChild = this.activeRouter.children.length;
    if (activeChild !== 0) {
      this.nothingSelected = false;
    }
  }
}
