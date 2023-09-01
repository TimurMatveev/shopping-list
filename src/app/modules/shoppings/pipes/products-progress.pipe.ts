import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "../model";

@Pipe({
  name: 'slProductsProgress',
  standalone: true,
})
export class ProductsProgressPipe implements PipeTransform {
  public transform(products: Product[]): number {
    return products.filter((product: Product) => product.bought).length / products.length;
  }
}
