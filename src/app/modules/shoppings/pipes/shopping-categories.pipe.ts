import { Pipe, PipeTransform } from "@angular/core";
import { Product, ShoppingShort } from "../model";
import { Category, CategoryService } from "../../categories";
import { map, Observable, of } from "rxjs";
import { booleanFilter } from "../../../shared/helpers/boolean-filter";

@Pipe({
  name: 'slShoppingCategories',
  standalone: true,
})
export class ShoppingCategoriesPipe implements PipeTransform {
  constructor(
    private categoryService: CategoryService,
  ) {
  }

  public transform(products: Map<Category['key'], Product[]> = new Map()): Observable<Category[]> {
    if (!products?.size) {
      return of([]);
    }

    return this.categoryService.allMap$
      .pipe(
        map((categoryMap: Map<Category['key'], Category>) => {
          return Array.from(products.keys())
            .map((categoryKey: Category['key']) => categoryMap.get(categoryKey))
            .filter(booleanFilter);
        }),
      );
  }
}
