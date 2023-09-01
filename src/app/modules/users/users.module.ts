import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslateModule } from "@ngx-translate/core";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";

import { AvatarModule } from "../../shared/ui/avatar";
import { ConfirmModalModule } from "../../shared/ui/confirm-modal/confirm-modal.module";
import { ControlErrorPipe } from "../../shared/pipes/control-error.pipe";
import { ExpandableListModule } from "../../shared/ui/expandable-list";
import { FilterModule } from "../../shared/ui/filter/filter.module";
import { FormModalModule } from "../../shared/ui/form-modal/form-modal.module";
import { LoadingModule } from "../../shared/ui/loading/loading.module";
import { PageModule } from "../../shared/ui/page/page.module";
import { SortModule } from "../../shared/ui/sort/sort.module";

import { UsersRoutingModule } from "./users-routing.module";
import { UserEditModalComponent, UserFilterModalComponent } from "./modals";
import { UserListPageComponent, UserPageComponent } from "./pages";
import {
  UserFilterComponent,
  UserFilterFormComponent,
  UserFormComponent,
  UserListComponent,
  UserListItemComponent,
  UserSortComponent,
} from "./components";
import { UserModalService } from "./services";

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
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
    ExpandableListModule,
    AvatarModule,
    MatButtonModule,
    MatIconModule,
    SortModule,
    FilterModule,
    MatDatepickerModule,
    ConfirmModalModule,
  ],
  declarations: [
    UserListPageComponent,
    UserPageComponent,

    UserEditModalComponent,
    UserFilterModalComponent,

    UserFilterComponent,
    UserFilterFormComponent,
    UserFormComponent,
    UserListComponent,
    UserListItemComponent,
    UserSortComponent,
  ],
  providers: [
    UserModalService,
  ],
})
export class UsersModule { }
