import { SharedDataService } from '../../../shared/services/shared-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-address',
  templateUrl: './footer-address.component.html',
  styleUrls: ['./footer-address.component.scss'],
})
export class FooterAddressComponent implements OnInit {
  footer: Footer;

  constructor(private sharedDataService: SharedDataService) {
    this.sharedDataService.websiteDetails.subscribe((response) => {
      try {
        const { adress, phone, email } = response.footer;
        this.footer = { adress, phone, email };
      } catch {
       //
      }
    });
  }

  ngOnInit(): void {
  
  }
}

interface Footer {
  adress: string;
  phone: string;
  email: string;
}
