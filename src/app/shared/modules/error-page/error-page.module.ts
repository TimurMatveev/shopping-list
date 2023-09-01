import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AccessDeniedPageComponent } from "./pages";
import { PageModule } from "../../ui/page/page.module";
import { ErrorBlockComponent } from "./components/error-block/error-block.component";
import { MatButtonModule } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

@NgModule({
  imports: [
    CommonModule,
    PageModule,
    MatButtonModule,
    TranslateModule,
    MatIconModule,
    RouterLink,
  ],
  declarations: [
    AccessDeniedPageComponent,
    NotFoundPageComponent,
    ErrorBlockComponent,
  ],
  exports: [
    AccessDeniedPageComponent,
    NotFoundPageComponent,
  ],
})
export class ErrorPageModule { }
