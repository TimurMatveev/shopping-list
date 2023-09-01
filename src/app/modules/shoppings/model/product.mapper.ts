import { ProductDto } from "../api";
import { Product } from "./shopping.types";
import { Category } from "../../categories";
import { ShoppingStatus } from "./shopping.constants";

export class ProductMapper {
  static toModel(
    dto: ProductDto,
    shoppingStatus: ShoppingStatus,
  ): Product {
    return {
      name: dto.name,
      bought: shoppingStatus === ShoppingStatus.Completed,
    };
  }

  static fromModel(model: Product): ProductDto {
    return {
      name: model.name,
    };
  }

  static toModelMap(
    record: Record<string, ProductDto[]>,
    shoppingStatus: ShoppingStatus,
  ): Map<Category['key'], Product[]> {
    return new Map(Object.entries(record).map(([category, products]) => {
      return [category, products.map((productDto: ProductDto) => ProductMapper.toModel(productDto, shoppingStatus))];
    }));
  }

  static fromModelMap(map: Map<Category['key'], Product[]>): Record<string, ProductDto[]> {
    return Object.fromEntries(Array.from(map.entries()).map(([category, products]) => {
      return [category, products.map(ProductMapper.fromModel)];
    }));
  }
}
