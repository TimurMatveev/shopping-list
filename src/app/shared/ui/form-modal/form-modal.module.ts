import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormActionsComponent } from "./components";
import { MatButtonModule } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";
import { FormLayoutComponent } from "./components/form-layout/form-layout.component";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    TranslateModule,
  ],
  declarations: [
    FormActionsComponent,
    FormLayoutComponent,
  ],
  exports: [
    FormActionsComponent,
    FormLayoutComponent,
  ],
})
export class FormModalModule { }
