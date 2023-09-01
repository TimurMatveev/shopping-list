import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'slAbbreviate',
  standalone: true,
})
export class AbbreviatePipe implements PipeTransform {
  public transform(value: string): string {
    return value
      .split(/\s+/g)
      .map((word) => word.at(0))
      .join('')
      .toUpperCase();
  }
}
