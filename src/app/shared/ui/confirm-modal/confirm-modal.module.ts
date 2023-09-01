import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmModalComponent } from "./modals/confirm-modal/confirm-modal.component";
import { ConfirmModalService } from "./services/confirm-modal.service";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    ConfirmModalService,
  ],
})
export class ConfirmModalModule { }
