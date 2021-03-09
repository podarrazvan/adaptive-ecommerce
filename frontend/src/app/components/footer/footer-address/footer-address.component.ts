import { SharedDataService } from '../../../shared/services/shared-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-address',
  templateUrl: './footer-address.component.html',
  styleUrls: ['./footer-address.component.scss'],
})
export class FooterAddressComponent {
  constructor(public sharedDataService: SharedDataService) {}
}
