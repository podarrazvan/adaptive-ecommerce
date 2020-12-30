import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent implements OnInit {

  @Input() categories: string[];
  @Output() finalCategories = new EventEmitter<string[]>();

  constructor() { }

  categoriesHide = true;
  editCategoryMode: number;
  category;
  newCategories: string[];

  ngOnInit(): void {
    this.newCategories = this.categories;
  }

  addNewValue(category) {
    console.log(category.value);
    this.newCategories.push(category.value);
    console.log(this.newCategories);
    this.finalCategories.emit(this.newCategories);
  }

  delete(index) {
    this.newCategories.splice(index, 1);
    this.finalCategories.emit(this.newCategories);
  }

  edit(index) {
    
  }

}
