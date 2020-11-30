import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { GetProductComponent } from '../components/get-product/get-product.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { LoginFormComponent } from '../forms/login-form/login-form.component';
import { SignupFormComponent } from '../forms/signup-form/signup-form.component';
import { ShortenPipe } from '../pipes/shorten.pipe';
import { DbFetchDataService } from '../services/database/db-fetch-data.service';

const COMPONENTS = [
    NavbarComponent,
    FooterComponent,
    GetProductComponent,
    ShortenPipe,
    SignupFormComponent,
    LoginFormComponent
  
]

@NgModule({
    declarations: [
      ...COMPONENTS
    ],
    imports: [
      MatIconModule,
      RouterModule,
      FormsModule,
      CommonModule
    ],
    providers: [DbFetchDataService],
    exports: [...COMPONENTS,]
  })
  export class SharedModule { }