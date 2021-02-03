import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../../shared/services/shared-data.service';

@Component({
  selector: 'app-shop-by-brand-logos',
  templateUrl: './shop-by-brand-logos.component.html',
  styleUrls: ['./shop-by-brand-logos.component.scss'],
})
export class ShopByBrandLogosComponent implements OnInit {
  constructor(private sharedDataService: SharedDataService) {}

  brands = [
    // {
    //   img:
    //     'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo-700x394.png',
    //   name: 'apple',
    // },
    {
      img:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1280px-Samsung_Logo.svg.png',
      name: 'samsung',
    },
    // {
    //   img:
    //     'https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png',
    //   name: 'microsoft',
    // },
    // {
    //   img: 'https://logos-world.net/wp-content/uploads/2020/04/Huawei-Logo.png',
    //   name: 'huawei',
    // },
  ];

  ngOnInit(): void {
    this.sharedDataService.updateBrand(this.brands[0]);
  }

  brandSelected(index) {
    this.sharedDataService.updateBrand(this.brands[index]);
  }
}
