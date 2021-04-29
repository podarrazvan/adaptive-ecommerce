import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISearch } from '../../interfaces/search.interface';
import { Statistics } from '../../interfaces/statistics.interface';

interface Views {
  views: number;
}

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getStatistics(): any {
    return this.http.get<Statistics>(`${environment.api}/statistics`);
  }

  createStatistics(): any {
    const statistics = {}; // ! ok?
    return this.http.post(`${environment.api}/statistics`, statistics);
  }

  updateSearch(searchedElement: string): any {
    const search: ISearch = {
      // TODO send just searchedElement, not an object...
      searchedElement,
    };
    return this.http.put(`${environment.api}/statistics/search`, search);
  }

  getMostSearched(): any {
    return this.http.get<ISearch[]>(
      `${environment.api}/statistics/most-searched`
    );
  }

  getAllWebsiteViews(): any {
    // TODO
  }
}
