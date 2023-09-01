import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from "@angular/common";
import {
  CreateButtonComponent,
  PageComponent,
  PageEmptyComponent,
  PageHeaderComponent,
  PageLoadingComponent
} from "./components";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    CreateButtonComponent,
    PageComponent,
    PageEmptyComponent,
    PageHeaderComponent,
    PageLoadingComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    CreateButtonComponent,
    PageComponent,
    PageEmptyComponent,
    PageHeaderComponent,
    PageLoadingComponent,
  ],
})
export class PageModule { }
