import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-address',
  templateUrl: './footer-address.component.html',
  styleUrls: ['./footer-address.component.scss']
})
export class FooterAddressComponent implements OnInit {

  footer = {
    adress: "Malinului 56",
    phone: "0770805675",
    email: "razvanpodar.pr@gmail.com"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
