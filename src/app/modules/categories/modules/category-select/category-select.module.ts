import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { ControlErrorPipe } from "../../../../shared/pipes/control-error.pipe";
import { I18nRecordPipe } from "../../../../shared/pipes/i18n-record.pipe";
import { SearchHighlightPipe } from "../../../../shared/pipes/search-highlight.pipe";
import { SelectSearchModule } from "../../../../shared/ui/select-search/select-search.module";

import { CategorySelectComponent } from "./components";
import { CategoryByTagDirective } from "./directives";

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    I18nRecordPipe,
    SelectSearchModule,
    TranslateModule,
    SearchHighlightPipe,
    ControlErrorPipe,
  ],
  declarations: [
    CategorySelectComponent,
    CategoryByTagDirective,
  ],
  exports: [
    CategorySelectComponent,
    CategoryByTagDirective,
  ]
})
export class CategorySelectModule { }
