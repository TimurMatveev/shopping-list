import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "../model";

@Pipe({
  name: 'slProductsTooltip',
  standalone: true,
})
export class ProductsTooltipPipe implements PipeTransform {
  public transform(products: Product[]): string {
    return products
      .map((product: Product) => product.name)
      .join(', ');
  }
}
