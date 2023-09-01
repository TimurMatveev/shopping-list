import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SelectSearchComponent } from "./components";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    SelectSearchComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    SelectSearchComponent,
  ],
})
export class SelectSearchModule { }
