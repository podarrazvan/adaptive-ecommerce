import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent {
  categoriesFormGroup: FormGroup;
  categoriesHide = true;
  editCategoryMode: number;
  categories; //! NOT OK

  constructor(
    private fb: FormBuilder,
    private configsService: ConfigsService,
    private adminService: AdminService,
    public sharedDataService: SharedDataService
  ) { 
    this.buildFormGroup(fb)
    this.sharedDataService.layout$.subscribe((response)=>{
      this.categories = response.categories;//! DON'T USE categories, USE categoriesForm()
    });
  }

  get categoriesForm() {
    return this.adminService.adminFormGroup.get('configs.categories') as FormArray;
  }

  get categoryName() {
    return this.categoriesFormGroup.get('name').value;
  }

  addNewValue() {
    this.categoriesForm.push(this.createCategory());
    this.categories.push({name: this.categoryName}); //! NOT OK!
    this.configsService.updateWebsite('websiteCategories', this.categories).subscribe();
  }

  delete(index) {
    this.categoriesForm.value.splice(index, 1);
    this.categories.splice(index, 1);
    this.configsService.updateWebsite('websiteCategories', this.categories).subscribe();
  }

  edit(index) {
    this.categories[index] = {name: this.categoryName}; //! NOT OK!
    this.categoriesForm.value[index] = {name: this.categoryName}; //! NOT OK!
    this.configsService.updateWebsite('websiteCategories', this.categories).subscribe(()=>{
      this.editCategoryMode = null
    });
  }

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
