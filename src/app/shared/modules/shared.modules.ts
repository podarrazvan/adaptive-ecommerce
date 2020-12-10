import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { DeleteAlertService } from '../components/delete-alert/delete-alert.service';
import { FooterComponent } from '../components/footer/footer.component';
import { GetProductComponent } from '../components/get-product/get-product.component';
import { GetRecommendedProductComponent } from '../components/get-recommended-product/get-recommended-product.component';
import { HorizontalProductComponent } from '../components/horizontal-product/horizontal-product.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RatingComponent } from '../components/rating/rating.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { LoginFormComponent } from '../forms/login-form/login-form.component';
import { SignupFormComponent } from '../forms/signup-form/signup-form.component';
import { ShortenPipe } from '../pipes/shorten.pipe';
import { DbDeleteService } from '../services/database/db-delete.service';
import { DbFetchDataService } from '../services/database/db-fetch-data.service';
import { DbStatisticsService } from '../services/database/db-statistics.service';
import { DbUploadService } from '../services/database/db-upload.service';
import { DbWebsiteEditService } from '../services/database/db-website-edit.sevice';
import { SharedDataService } from '../services/shared-data.service';

const COMPONENTS = [
    NavbarComponent,
    FooterComponent,
    GetProductComponent,
    ShortenPipe,
    SignupFormComponent,
    LoginFormComponent,
    RatingComponent,
    GetRecommendedProductComponent,
    CarouselComponent,
    SearchBarComponent,
    HorizontalProductComponent
]

@NgModule({
    declarations: [
      ...COMPONENTS
    ],
    imports: [
      MatIconModule,
      RouterModule,
      FormsModule,
      CommonModule,
      AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [DbUploadService,DbFetchDataService,DbWebsiteEditService,DbDeleteService,SharedDataService, DeleteAlertService,DbStatisticsService],
    exports: [...COMPONENTS,]
  })
  export class SharedModule { }