import { Pipe, PipeTransform } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { map, Observable, of, startWith, switchMap } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: 'slControlError',
  standalone: true,
})
export class ControlErrorPipe implements PipeTransform {
  constructor(
    private translateService: TranslateService,
  ) {
  }

  public transform(control: AbstractControl): Observable<string> {
    return control.statusChanges
      .pipe(
        startWith(null),
        map(() => control.valid ? null : control.errors),
        switchMap((errors: ValidationErrors | null) => {
          const first = errors && Object.entries(errors).at(0);

          if (!first) {
            return of('');
          }

          const [error, value] = first;

          return this.translateService.get(`form.error.${error}`, value);
        }),
      )
  }
}
