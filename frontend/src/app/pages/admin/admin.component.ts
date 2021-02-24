import { SharedDataService } from './../../shared/services/shared-data.service';
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from './admin.service';
import { buildAdminFormGroup } from './admin.form-builder';
import { buildProductFormGroup } from './admin-form.helpers';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements DoCheck, OnInit, OnDestroy {
  constructor(private activeRouter: ActivatedRoute,
              private sharedDataService: SharedDataService,
              private adminService: AdminService) {
                this.adminService.adminFormGroup = buildAdminFormGroup(); 
                this.adminService.productFormGroup = buildProductFormGroup(); 
              }

  mobile: boolean;

  nothingSelected = true;

  ngOnInit(){
    this.mobile = this.sharedDataService.mobile;
    const reloaded = JSON.parse(localStorage.getItem('reloaded'))
    if(!reloaded) {
      const darkMode  = JSON.parse(localStorage.getItem('darkMode'));
      localStorage.setItem('darkModeAdmin', JSON.stringify(darkMode));
      if(darkMode){
        localStorage.setItem('darkMode', JSON.stringify(false));
        localStorage.setItem('reloaded', JSON.stringify(true));
        location.reload();
      }
    }
  }

  ngDoCheck(): void {
    this.checkUrl();
  }

  checkUrl() {
    var _activeChild = this.activeRouter.children.length;
    if (_activeChild != 0) {
      this.nothingSelected = false;
    }
  }

  ngOnDestroy() {
    const darkMode  = JSON.parse(localStorage.getItem('darkModeAdmin'));
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if(darkMode){
      location.reload();
    }
    localStorage.removeItem("darkModeAdmin");
    localStorage.removeItem("reloaded");
  }
}
