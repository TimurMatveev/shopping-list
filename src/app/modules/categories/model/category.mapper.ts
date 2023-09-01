import { CategoryDto } from "../api";
import { Category } from "./category.types";
import {
  ApiListFilterValue,
  ApiListParamsMapper
} from "../../../shared/types/api-list.types";

export class CategoryMapper {
  static toModel(dto: CategoryDto): Category {
    return {
      key: dto.id,
      name: dto.name,
      image: dto.image,
      tags: new Set<string>(dto.tags),
    };
  }

  static fromModel(model: Category): CategoryDto {
    return {
      id: model.key,
      name: model.name,
      image: model.image,
      ...(model.tags.size ? { tags: Array.from(model.tags) } : {}),
    };
  }

  static listParamsMapper: ApiListParamsMapper = (key: string, value?: ApiListFilterValue) => {
    switch (key) {
      case 'key':
        return { key: 'id', value };
      default:
        return { key, value };
    }
  };
}
