import { NgModule } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

export const MODULES = [
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule,
]

@NgModule({
  imports: [
    ...MODULES
  ],
  exports:[MODULES]
})
export class AngularMaterialModule {}
