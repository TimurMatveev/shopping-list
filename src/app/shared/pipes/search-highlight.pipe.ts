import { Pipe, PipeTransform } from "@angular/core";
import { booleanFilter } from "../helpers/boolean-filter";

@Pipe({
  name: 'slSearchHighlight',
  standalone: true,
})
export class SearchHighlightPipe implements PipeTransform {
  public transform(value: string | null, search: string | null): string {
    if (!search) {
      return value || '';
    }

    if (!value) {
      return '';
    }

    const regexp = new RegExp(`(${ search })`, 'i');

    return value
      .split(regexp)
      .filter(booleanFilter)
      .map((substring: string) => regexp.test(substring)
        ? `<span class="sl-search-highlight">${ substring }</span>`
        : substring
      )
      .join('')
  }
}
