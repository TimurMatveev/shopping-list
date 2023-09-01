import { Pipe, PipeTransform } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { I18nRecord } from "../types/i18n-record.types";
import { Language } from "../../../assets/i18n";
import { LocaleService } from "../services/locale/locale.service";

@Pipe({
  name: 'slI18nRecord',
  standalone: true,
})
export class I18nRecordPipe implements PipeTransform {
  constructor(
    private localeService: LocaleService,
  ) {
  }

  public transform(record: I18nRecord | null, language?: Language): Observable<string> {
    if (!record) {
      return of('');
    }

    if (language) {
      return of(record[language]);
    }

    return this.localeService.selected$
      .pipe(
        map((language: Language) => record[language]),
      );
  }
}
