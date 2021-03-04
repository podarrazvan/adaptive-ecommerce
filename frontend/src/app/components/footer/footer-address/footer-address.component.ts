import { SharedDataService } from '../../../shared/services/shared-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-address',
  templateUrl: './footer-address.component.html',
  styleUrls: ['./footer-address.component.scss'],
})
export class FooterAddressComponent {
  footer: Footer;

  constructor(private sharedDataService: SharedDataService) {
    const response = this.sharedDataService.getWebsiteConfigs();
    const { adress, phone, email } = response.footer;
    this.footer = { adress, phone, email };
  }
}

interface Footer {
  adress: string;
  phone: string;
  email: string;
}
