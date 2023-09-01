import { NgModule } from '@angular/core';
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoryListPageComponent } from "./pages";
import { PageModule } from "../../shared/ui/page/page.module";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import {
  CategoryFormComponent,
  CategoryListComponent,
  CategoryListItemComponent,
  CategorySortComponent,
} from "./components";
import { CategoryModalService } from "./services";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CategoryCreateModalComponent } from "./modals";
import { MatDialogModule } from "@angular/material/dialog";
import { FormModalModule } from "../../shared/ui/form-modal/form-modal.module";
import { ControlErrorPipe } from "../../shared/pipes/control-error.pipe";
import { ImgSrcControlModule } from "../../shared/ui/img-src-control/img-src-control.module";
import { MatIconModule } from "@angular/material/icon";
import { I18nRecordPipe } from "../../shared/pipes/i18n-record.pipe";
import { LoadingModule } from "../../shared/ui/loading/loading.module";
import { MatButtonModule } from "@angular/material/button";
import { ExpandableListModule } from "../../shared/ui/expandable-list";
import { CategoryEditModalComponent } from "./modals/category-edit-modal/category-edit-modal.component";
import { ConfirmModalModule } from "../../shared/ui/confirm-modal/confirm-modal.module";
import { SortModule } from "../../shared/ui/sort/sort.module";
import { FilterModule } from "../../shared/ui/filter/filter.module";
import { PermissionModule } from "../../shared/modules/permission";
import { MatChipsModule } from "@angular/material/chips";
import { CategoryTagsPipe } from "./pipes";
import { ArrayFormControlModule } from "../../shared/directives/array-form-control";

@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    PageModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormModalModule,
    ControlErrorPipe,
    ImgSrcControlModule,
    MatIconModule,
    I18nRecordPipe,
    NgOptimizedImage,
    LoadingModule,
    MatButtonModule,
    ExpandableListModule,
    ConfirmModalModule,
    SortModule,
    FilterModule,
    PermissionModule,
    MatChipsModule,
    CategoryTagsPipe,
    ArrayFormControlModule,
  ],
  declarations: [
    CategoryListPageComponent,
    CategoryListComponent,
    CategoryListItemComponent,
    CategorySortComponent,
    CategoryFormComponent,
    CategoryCreateModalComponent,
    CategoryEditModalComponent,
  ],
  providers: [
    CategoryModalService,
  ],
  exports: [
    CategoryListComponent
  ]
})
export class CategoriesModule { }
