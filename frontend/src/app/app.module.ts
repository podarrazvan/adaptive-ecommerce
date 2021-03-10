import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/modules/shared.module';
import { Interceptor } from './shared/interceptor';
import { AppRoutesModule } from './app.routes';
import { AdminModule } from './pages/admin/admin.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutesModule,
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AdminModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
