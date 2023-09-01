import { Injectable } from "@angular/core";
import { ConfirmModalData } from "../confirm-modal.types";
import { TranslateService } from "@ngx-translate/core";
import { map, Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmModalComponent } from "../modals/confirm-modal/confirm-modal.component";

@Injectable()
export class ConfirmModalService {
  private readonly defaultData: ConfirmModalData = {
    title: this.translateService.instant('confirm.title'),
    confirm: this.translateService.instant('common.yes'),
    reject: this.translateService.instant('common.no'),
  };

  constructor(
    private translateService: TranslateService,
    private matDialog: MatDialog,
  ) {
  }

  confirm(data?: Partial<ConfirmModalData>): Observable<boolean> {
    return this.matDialog
      .open<ConfirmModalComponent, ConfirmModalData, boolean>(ConfirmModalComponent, {
        data: {
          ...this.defaultData,
          ...data,
        },
      })
      .afterClosed()
      .pipe(
        map(Boolean)
      );
  }
}
