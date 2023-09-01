import { ErrorHandler, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) {
  }

  public handleError(error: Error): void {
    const translateKey = `error.${error.message}`;
    const translatedMessage = this.translateService.instant(`error.${error.message}`);

    this.snackBar.open(
      translatedMessage === translateKey ? error.message : translatedMessage,
      '',
      {
        duration: 5000,
      },
    );
  }
}
