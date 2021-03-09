import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-alert',
  templateUrl: './info-alert.component.html',
  styleUrls: ['./info-alert.component.scss']
})
export class InfoAlertComponent {
  @Input() success: boolean;
  @Input() message: string;
}
