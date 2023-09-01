import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ImgSrcControlComponent } from "./components/img-src-control/img-src-control.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [
    ImgSrcControlComponent,
  ],
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		NgOptimizedImage,
		MatSelectModule,
	],
  exports: [
    ImgSrcControlComponent,
  ],
})
export class ImgSrcControlModule { }
