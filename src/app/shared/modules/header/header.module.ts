import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BreadcrumbsModule } from "../../ui/breadcrumbs/breadcrumbs.module";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { AbstractBreadcrumbsService } from "../../ui/breadcrumbs/services/abstract-breadcrumbs.service";
import { RouterBreadcrumbsService } from "../../services/router-breadcrumbs/router-breadcrumbs.service";
import { MatMenuModule } from "@angular/material/menu";
import { AvatarModule } from "../../ui/avatar/avatar.module";
import { MatDividerModule } from "@angular/material/divider";
import { UserMenuComponent } from "./components/user-menu/user-menu.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    BreadcrumbsModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,
    MatIconModule,
    MatMenuModule,
    AvatarModule,
    MatDividerModule,
    TranslateModule,
  ],
  declarations: [
    HeaderComponent,
    UserMenuComponent,
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [
    {
      provide: AbstractBreadcrumbsService,
      useClass: RouterBreadcrumbsService,
    },
  ],
})
export class HeaderModule { }
