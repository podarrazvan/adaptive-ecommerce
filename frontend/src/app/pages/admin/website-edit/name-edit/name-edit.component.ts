import { Component } from '@angular/core';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-name-edit',
  templateUrl: './name-edit.component.html',
  styleUrls: ['./name-edit.component.scss'],
})
export class NameEditComponent {
  editName = false;
  name;
  configs;

  constructor(
    private adminService: AdminService,
    private configsService: ConfigsService,
    private sharedDataService: SharedDataService
  ) {
    this.configs = this.sharedDataService.getWebsiteConfigs();
    this.name = this.configs.name;
  }

  get formName() {
    return this.adminService.adminFormGroup.get('configs.name');
  }

  setName() {
    this.configsService.updateWebsite('websiteName', this.formName.value);
    this.editName = false;
  }
}
