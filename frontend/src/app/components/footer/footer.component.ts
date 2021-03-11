import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(public sharedDataService: SharedDataService){}
}
