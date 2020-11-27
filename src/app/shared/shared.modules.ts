import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const COMPONENTS = [
    NavbarComponent,
    FooterComponent
]

@NgModule({
    declarations: [
      ...COMPONENTS
    ],
    imports: [
 
    ],
    providers: [],
    exports: [...COMPONENTS]
  })
  export class SharedModule { }