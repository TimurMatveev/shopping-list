import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { AvatarComponent, AvatarListComponent } from "./components";
import { AbbreviatePipe } from "../../pipes/abbreviate.pipe";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
	imports: [
		CommonModule,
		NgOptimizedImage,
		AbbreviatePipe,
		MatIconModule,
		MatTooltipModule,
	],
  declarations: [
    AvatarComponent,
    AvatarListComponent,
  ],
  exports: [
    AvatarComponent,
    AvatarListComponent,
  ],
})
export class AvatarModule { }
