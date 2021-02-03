import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              private sharedDataService: SharedDataService) { }
  
  searchBar: FormGroup;

  categories: string[] = [];

  selectedCategory: string;

  ngOnInit(): void {
    this.sharedDataService.websiteDetails.subscribe(data => {
      try {
        this.categories = data.categories
      } catch {
        ///
      }
    });
    this.searchBar = this.fb.group({
      search: ['',Validators.required],
      category:['all']
    });
  }

  onSearch() {
    const search = this.searchBar.value.search;
    this.router.navigate(['../search',this.searchBar.value.category ,search.replace(/\s/g, '-')]);
  }

  searchInCategories(category) {
    this.searchBar.patchValue({
      category: category
    });
    this.selectedCategory = category;
  }

}
