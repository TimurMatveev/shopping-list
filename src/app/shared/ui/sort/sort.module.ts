import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SortComponent } from "./components/sort/sort.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { SortItemDirective } from "./directives/sort-item.directive";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  declarations: [
    SortComponent,
    SortItemDirective,
  ],
  exports: [
    SortComponent,
    SortItemDirective,
  ],
})
export class SortModule { }
