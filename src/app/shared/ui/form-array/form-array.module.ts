import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormArrayComponent } from "./components/form-array/form-array.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormArrayItemDirective } from "./directives";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
  ],
  declarations: [
    FormArrayComponent,
    FormArrayItemDirective,
  ],
  exports: [
    FormArrayComponent,
    FormArrayItemDirective,
  ],
})
export class FormArrayModule {}
