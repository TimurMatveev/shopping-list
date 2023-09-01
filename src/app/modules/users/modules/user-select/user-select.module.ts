import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { ControlErrorPipe } from "../../../../shared/pipes/control-error.pipe";
import { SearchHighlightPipe } from "../../../../shared/pipes/search-highlight.pipe";
import { SelectSearchModule } from "../../../../shared/ui/select-search/select-search.module";

import { UserSelectComponent } from "./components";
import { AvatarModule } from "../../../../shared/ui/avatar";

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    SelectSearchModule,
    TranslateModule,
    SearchHighlightPipe,
    ControlErrorPipe,
    AvatarModule,
  ],
  declarations: [
    UserSelectComponent,
  ],
  exports: [
    UserSelectComponent,
  ]
})
export class UserSelectModule { }
