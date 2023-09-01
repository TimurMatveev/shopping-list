import { Pipe, PipeTransform } from "@angular/core";
import { Category } from "../model";
import { map, Observable, of } from "rxjs";
import { AvatarListItem } from "../../../shared/ui/avatar";
import { LocaleService } from "../../../shared/services/locale/locale.service";
import { Language } from "../../../../assets/i18n";

@Pipe({
  name: 'slCategoryAvatarList',
  standalone: true,
})
export class CategoryAvatarListPipe implements PipeTransform {
  constructor(
    private localeService: LocaleService,
  ) {
  }

  public transform(categories: Category[] | null): Observable<AvatarListItem[]> {
    if (!categories) {
      return of([]);
    }

    return this.localeService.selected$
      .pipe(
        map((language: Language) => categories.map((category: Category) => ({
          key: category.key,
          url: category.image,
          name: category.name[language],
        }))),
      );
  }
}
