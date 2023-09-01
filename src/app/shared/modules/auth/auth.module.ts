import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AuthPageComponent } from "./pages/auth-page/auth-page.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslateModule } from "@ngx-translate/core";
import { MatInputModule } from "@angular/material/input";
import { ControlErrorPipe } from "../../pipes/control-error.pipe";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SignUpFormComponent } from "./components/sign-up-form/sign-up-form.component";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { ImgSrcControlModule } from "../../ui/img-src-control/img-src-control.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    TranslateModule,
    MatInputModule,
    ControlErrorPipe,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ImgSrcControlModule,
  ],
  declarations: [
    AuthPageComponent,
    LoginFormComponent,
    SignUpFormComponent,
  ],
})
export class AuthModule { }
