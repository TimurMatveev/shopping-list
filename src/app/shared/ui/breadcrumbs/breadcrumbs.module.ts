import { NgModule } from '@angular/core';
import { BreadcrumbsComponent } from "./components/breadcrumbs/breadcrumbs.component";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { BreadcrumbDirective } from "./directives/breadcrumb.directive";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { BreadcrumbLinkComponent } from "./components/breadcrumb-link/breadcrumb-link.component";

@NgModule({
  declarations: [
    BreadcrumbDirective,
    BreadcrumbsComponent,
    BreadcrumbLinkComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    BreadcrumbDirective,
    BreadcrumbsComponent,
    BreadcrumbLinkComponent,
  ],
})
export class BreadcrumbsModule { }
