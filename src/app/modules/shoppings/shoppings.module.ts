import { NgModule } from '@angular/core';
import { ShoppingsRoutingModule } from "./shoppings-routing.module";
import { CommonModule } from "@angular/common";
import { PageModule } from "../../shared/ui/page/page.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslateModule } from "@ngx-translate/core";
import { MatInputModule } from "@angular/material/input";
import { ControlErrorPipe } from "../../shared/pipes/control-error.pipe";
import { MatSelectModule } from "@angular/material/select";
import { LoadingModule } from "../../shared/ui/loading/loading.module";
import { MatDialogModule } from "@angular/material/dialog";
import { FormModalModule } from "../../shared/ui/form-modal/form-modal.module";
import { ShoppingModalService } from "./services";
import { CategoriesModule, CategoryAvatarListPipe, CategoryByKeyPipe, CategorySelectModule } from "../categories";
import { ExpandableListModule } from "../../shared/ui/expandable-list";
import { AvatarModule } from "../../shared/ui/avatar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { SortModule } from "../../shared/ui/sort/sort.module";
import { FilterModule } from "../../shared/ui/filter/filter.module";
import {
  ShoppingCreateModalComponent,
  ShoppingEditModalComponent,
  ShoppingFilterModalComponent,
  ShoppingShareModalComponent
} from "./modals";
import {
  ShoppingListPageComponent,
  ShoppingPageComponent
} from "./pages";
import {
  ProductListComponent, ShoppingBulletsComponent, ShoppingComponent,
  ShoppingFilterComponent,
  ShoppingFilterFormComponent,
  ShoppingFormComponent,
  ShoppingListComponent,
  ShoppingListItemComponent,
  ShoppingSortComponent,
  ShoppingStatusComponent,
} from "./components";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FormArrayModule } from "../../shared/ui/form-array/form-array.module";
import { StatusModule } from "../../shared/ui/status/status.module";
import { ProductsProgressPipe, ShoppingCategoriesPipe } from "./pipes";
import { I18nRecordPipe } from "../../shared/pipes/i18n-record.pipe";
import { MatDividerModule } from "@angular/material/divider";
import { ProductsTooltipPipe } from "./pipes/products-tooltip.pipe";
import { MatBadgeModule } from "@angular/material/badge";
import { MatChipsModule } from "@angular/material/chips";
import { ArrayFormControlModule } from "../../shared/directives/array-form-control";
import { UserSelectModule } from "../users";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ProgressModule } from "../../shared/ui/progress";

@NgModule({
  imports: [
    CommonModule,
    ShoppingsRoutingModule,
    PageModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    TranslateModule,
    MatInputModule,
    ControlErrorPipe,
    MatSelectModule,
    LoadingModule,
    MatDialogModule,
    FormModalModule,
    CategoriesModule,
    ExpandableListModule,
    AvatarModule,
    MatButtonModule,
    MatIconModule,
    SortModule,
    FilterModule,
    MatTooltipModule,
    CategorySelectModule,
    FormArrayModule,
    StatusModule,
    ShoppingCategoriesPipe,
    CategoryAvatarListPipe,
    CategoryByKeyPipe,
    I18nRecordPipe,
    MatDividerModule,
    ProductsTooltipPipe,
    MatBadgeModule,
    MatChipsModule,
    ArrayFormControlModule,
    UserSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    ProductsProgressPipe,
    ProgressModule,
  ],
  declarations: [
    ShoppingListPageComponent,
    ShoppingPageComponent,

    ShoppingCreateModalComponent,
    ShoppingEditModalComponent,
    ShoppingFilterModalComponent,
    ShoppingShareModalComponent,

    ProductListComponent,
    ShoppingBulletsComponent,
    ShoppingComponent,
    ShoppingFilterComponent,
    ShoppingFilterFormComponent,
    ShoppingFormComponent,
    ShoppingListComponent,
    ShoppingListItemComponent,
    ShoppingSortComponent,
    ShoppingStatusComponent,
  ],
  providers: [
    ShoppingModalService,
  ],
})
export class ShoppingsModule { }
