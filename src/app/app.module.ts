import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from "./modules/dashboard";
import { HttpClientModule } from "@angular/common/http";
import { HeaderModule } from "./shared/modules/header/header.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TranslationModule } from "./shared/modules/translation/translation.module";
import { LOCAL_STORAGE } from "./shared/providers/local-storage/local-storage.provider";
import { AuthModule } from "./shared/modules/auth";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatNativeDateModule } from "@angular/material/core";
import { PermissionModule } from "./shared/modules/permission";
import { ErrorPageModule } from "./shared/modules/error-page";
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from "@angular/material/checkbox";
import { ErrorHandlerService } from "./shared/services/error-handler/error-handler.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslationModule,
    DashboardModule,
    AppRoutingModule,
    HeaderModule,
    MatProgressSpinnerModule,
    AuthModule,
    MatSnackBarModule,
    MatNativeDateModule,
    PermissionModule,
    ErrorPageModule,
  ],
  providers: [
    {
      provide: LOCAL_STORAGE,
      useValue: localStorage,
    },
    {
      provide: ErrorHandler,
      useExisting: ErrorHandlerService,
    },
    {
      provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
      useValue: {
        color: 'primary',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
