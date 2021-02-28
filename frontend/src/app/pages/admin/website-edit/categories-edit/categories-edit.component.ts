import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent {
  categoriesFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private configsService: ConfigsService,
    private adminService: AdminService
  ) { this.buildFormGroup(fb)}

  categoriesHide = true;
  editCategoryMode: number;

  get categoriesForm() {
    return this.adminService.adminFormGroup.get('configs.categories') as FormArray;
  }

  get categoryName() {
    return this.categoriesFormGroup.get('name').value;
  }

  addNewValue() {
    this.categoriesForm.push(this.createCategory());
    this.configsService.updateWebsite('websiteCategories', this.categoriesForm.value);
  }

  delete(index) {
    this.categoriesForm.value.splice(index, 1);
    this.configsService.updateWebsite('websiteCategories', this.categoriesForm.value);
  }

  edit(index) {}

  public createCategory(): FormGroup {
    const name = this.categoryName;
    return this.fb.group({name});
  }

   private buildFormGroup(fb) {
    this.categoriesFormGroup = fb.group({
      name: fb.control(null),
    });
  }

}
