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
  configs;

  constructor(
    private adminService: AdminService,
    private configsService: ConfigsService,
    public sharedDataService: SharedDataService
  ) {
  }

  get formName() {
    return this.adminService.adminFormGroup.get('configs');
  }

  setName() {
    this.configsService.updateWebsite('websiteName', this.formName.value);
    this.editName = false;
  }
}
