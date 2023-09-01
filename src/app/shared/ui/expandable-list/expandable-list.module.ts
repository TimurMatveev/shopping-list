import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";

import { ExpandableListComponent } from "./components";
import { ExpansionItemActionsDirective, ExpansionItemBodyDirective, ExpansionItemHeadDirective } from "./directives";

@NgModule({
  declarations: [
    ExpandableListComponent,
    ExpansionItemBodyDirective,
    ExpansionItemHeadDirective,
    ExpansionItemActionsDirective,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
  ],
  exports: [
    ExpandableListComponent,
    ExpansionItemBodyDirective,
    ExpansionItemHeadDirective,
    ExpansionItemActionsDirective,
  ],
})
export class ExpandableListModule { }
