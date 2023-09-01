import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ProgressComponent } from "./components";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  declarations: [
    ProgressComponent,
  ],
  exports: [
    ProgressComponent,
  ],
})
export class ProgressModule { }
