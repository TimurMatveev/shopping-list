import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FilterComponent } from "./components/filter/filter.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  declarations: [
    FilterComponent,
  ],
  exports: [
    FilterComponent,
  ],
})
export class FilterModule { }
