import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { LoadingComponent } from "./components/loading/loading.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    LoadingComponent,
  ],
  exports: [
    LoadingComponent,
  ],
})
export class LoadingModule { }
