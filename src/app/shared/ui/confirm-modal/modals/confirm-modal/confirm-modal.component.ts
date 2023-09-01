import { Component, Inject } from '@angular/core';
import { ConfirmModalData } from "../../confirm-modal.types";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'sl-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public confirmData: ConfirmModalData,
    public modalRef: MatDialogRef<boolean>,
  ) {
  }
}
