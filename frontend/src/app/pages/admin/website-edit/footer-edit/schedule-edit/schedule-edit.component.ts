import { Component } from '@angular/core';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
})
export class ScheduleEditComponent {
  scheduleHours = ['-'];

  constructor(private adminService: AdminService) {
    for (let i = 0; i < 25; i++) {
      this.scheduleHours.push(i.toString());
    }
  }

  get scheduleForm(): any {
    return this.adminService.adminFormGroup.get('schedule');
  }
}
