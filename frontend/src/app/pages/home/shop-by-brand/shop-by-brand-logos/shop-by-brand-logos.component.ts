import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Brand } from 'src/app/shared/interfaces/brand.interface';

@Component({
  selector: 'app-shop-by-brand-logos',
  templateUrl: './shop-by-brand-logos.component.html',
  styleUrls: ['./shop-by-brand-logos.component.scss'],
})
export class ShopByBrandLogosComponent {
  @Input() brands: Brand[];
  @Output() selectedBrand = new EventEmitter<Brand>();

  brandSelected(index): void {
    this.selectedBrand.emit(index);
  }
}
