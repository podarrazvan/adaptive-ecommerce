import { SharedDataService } from './../../shared/services/shared-data.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from './admin.service';
import { buildAdminFormGroup } from './admin.form-builder';
import { buildProductFormGroup } from './admin-form.helpers';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';

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
    private adminService: AdminService
  ) {
    this.adminService.adminFormGroup = buildAdminFormGroup();
    this.adminService.productFormGroup = buildProductFormGroup();

    // !! nuj ce face asta
    // const configs = this.sharedDataService.getWebsiteConfigs();
    // if (configs._id === undefined) {
    //   this.configsService.createconfigs();
    // }
  }

  //TODO use observabile!
  ngDoCheck(): void {
    this.checkUrl();
  }

  checkUrl() {
    var _activeChild = this.activeRouter.children.length;
    if (_activeChild != 0) {
      this.nothingSelected = false;
    }
  }
}
