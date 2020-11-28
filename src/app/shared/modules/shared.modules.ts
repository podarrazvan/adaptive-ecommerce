import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from '../components/footer/footer.component';
import { GetProductComponent } from '../components/get-product/get-product.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ShortenPipe } from '../pipes/shorten.pipe';
import { DbFetchDataService } from '../services/database/db-fetch-data.service';

const COMPONENTS = [
    NavbarComponent,
    FooterComponent,
    GetProductComponent,
    ShortenPipe
]

@NgModule({
    declarations: [
      ...COMPONENTS
    ],
    imports: [
      BrowserModule
    ],
    providers: [DbFetchDataService],
    exports: [...COMPONENTS,]
  })
  export class SharedModule { }