import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,) { }
  
  searchBar: FormGroup;

  ngOnInit(): void {
    this.searchBar = this.fb.group({
      search: ['',Validators.required]
    });
  }

  onSearch() {
    const search = this.searchBar.value.search;
    this.router.navigate(['../search', search.replace(/\s/g, '-')]);
  }

}
