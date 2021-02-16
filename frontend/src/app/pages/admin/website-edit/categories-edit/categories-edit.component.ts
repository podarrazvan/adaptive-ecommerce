import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent implements OnInit {

  @Input() categories: string[] = [];
  @Output() finalCategories = new EventEmitter<string[]>();

  constructor(private configsService: ConfigsService) { }

  categoriesHide = true;
  editCategoryMode: number;
  category;
  newCategories: string[];

  ngOnInit(): void {
    this.newCategories = this.categories;
  }

  addNewValue(category) {
    this.newCategories.push(category.value);
    this.finalCategories.emit(this.newCategories);
    this.configsService.updateWebsite('websiteCategories',this.newCategories);
  }

  delete(index) {
    this.newCategories.splice(index, 1);
    this.finalCategories.emit(this.newCategories);
  }

  edit(index) {

  }

}
