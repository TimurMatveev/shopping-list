import { Pipe, PipeTransform } from "@angular/core";
import { Category, CategoryService } from "../model";
import { map, Observable, of } from "rxjs";

@Pipe({
  name: 'slCategoryByKey',
  standalone: true,
})
export class CategoryByKeyPipe implements PipeTransform {
  constructor(
    private categoryService: CategoryService,
  ) {
  }

  public transform(categoryKey: Category['key'] | null): Observable<Category | null> {
    if (!categoryKey) {
      return of(null);
    }

    return this.categoryService.allMap$
      .pipe(
        map((categoryMap: Map<Category['key'], Category>) => categoryMap.get(categoryKey) || null),
      );
  }
}
