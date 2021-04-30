import { Component } from '@angular/core';
import { ISearch } from 'src/app/shared/interfaces/search.interface';
import { StatisticsService } from 'src/app/shared/services/database/statistics.service';

@Component({
  selector: 'app-top-most-searched',
  templateUrl: './top-most-searched.component.html',
  styleUrls: ['./top-most-searched.component.scss'],
})
export class TopMostSearchedComponent {
  elements: ISearch[];

  constructor(private statisticsService: StatisticsService) {
    this.statisticsService.getMostSearched().subscribe((result) => {
      this.elements = result;
    });
  }
}
