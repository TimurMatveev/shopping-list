import { NgModule } from '@angular/core';
import { DashboardPageComponent } from "./pages";
import { RouterLink } from "@angular/router";
import { PageModule } from "../../shared/ui/page/page.module";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { DashboardCardComponent } from "./components";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { PermissionModule } from "../../shared/modules/permission";

@NgModule({
	imports: [
		CommonModule,
		RouterLink,
		PageModule,
		MatCardModule,
		MatIconModule,
		NgOptimizedImage,
		TranslateModule,
		PermissionModule,
	],
  declarations: [
    DashboardPageComponent,
    DashboardCardComponent,
  ],
  exports: [
    DashboardPageComponent,
    DashboardCardComponent,
  ],
})
export class DashboardModule { }
