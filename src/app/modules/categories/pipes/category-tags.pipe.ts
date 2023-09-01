import { Pipe, PipeTransform } from "@angular/core";
import { Category } from "../model";

@Pipe({
  name: 'slCategoryTags',
  standalone: true,
})
export class CategoryTagsPipe implements PipeTransform {
  public transform(category: Category): string {
    return Array.from(category.tags)
      .map((tag: string) => `#${tag}`)
      .join(', ');
  }
}
