import { Injectable } from "@angular/core";
import { map, Observable, shareReplay, startWith } from "rxjs";
import { Language } from "../../../../assets/i18n";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  public readonly selected$: Observable<Language> = this.translateService.onLangChange
    .pipe(
      map(({ lang }) => lang as Language),
      startWith(this.translateService.currentLang as Language),
      shareReplay(1),
    );

  constructor(
    private translateService: TranslateService,
  ) {
  }
}
