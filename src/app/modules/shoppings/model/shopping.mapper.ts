import { ShoppingCreateDto, ShoppingDto } from "../api";
import { Shopping, ShoppingCreate, ShoppingShort } from "./shopping.types";
import { User } from "../../users";
import { ShoppingStatus } from "./shopping.constants";
import { ProductMapper } from "./product.mapper";

export class ShoppingMapper {
  static toShortModel(dto: ShoppingDto): ShoppingShort {
    const status: ShoppingStatus = ShoppingMapper.getStatus(dto.status);
    return {
      name: dto.name,
      userId: dto.userId,
      products: ProductMapper.toModelMap(dto.products, status),
      id: dto.id,
      createdAt: new Date(dto.createdAt),
      updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : null,
      shareWith: dto.shareWith || [],
      status,
      implementerId: dto.implementerId || null,
    };
  }

  static toModel(dto: ShoppingDto, users: User[]): Shopping {
    return ShoppingMapper.expandModel(ShoppingMapper.toShortModel(dto), users);
  }

  static fromShortModel(model: ShoppingShort): ShoppingDto {
    return {
      name: model.name,
      userId: model.userId,
      products: ProductMapper.fromModelMap(model.products),
      id: model.id,
      createdAt: model.createdAt.valueOf(),
      status: model.status,
      ...(model.updatedAt ? { implementerId: model.updatedAt.valueOf() } : {}),
      ...(model.shareWith.length ? { shareWith: model.shareWith } : {}),
      ...(model.implementerId ? { implementerId: model.implementerId } : {}),
    };
  }

  static fromModel(model: Shopping): ShoppingDto {
    return ShoppingMapper.fromShortModel(ShoppingMapper.shortenModel(model));
  }

  static fromCreateModel(model: ShoppingCreate): ShoppingCreateDto {
    return {
      name: model.name,
      userId: model.userId,
      products: ProductMapper.fromModelMap(model.products),
      status: ShoppingStatus.Open,
    };
  }

  static shortenModel(model: Shopping): ShoppingShort {
    return {
      name: model.name,
      userId: model.user.id,
      products: model.products,
      id: model.id,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      shareWith: model.shareWith.map((user: User) => user.id),
      status: model.status,
      implementerId: model.implementer && model.implementer.id,
    };
  }

  static expandModel(model: ShoppingShort, users: User[]): Shopping {
    return {
      name: model.name,
      products: model.products,
      id: model.id,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      status: model.status,
      user: users.find((user: User) => user.id === model.userId) as User,
      shareWith: users.filter((user: User) => model.shareWith.includes(user.id)),
      implementer: model.implementerId && users.find((user: User) => user.id === model.implementerId) || null,
    };
  }

  static getStatus(value?: string): ShoppingStatus {
    switch (value) {
      case ShoppingStatus.Completed:
        return ShoppingStatus.Completed;
      case ShoppingStatus.Pending:
        return ShoppingStatus.Pending;
      case ShoppingStatus.Open:
      default:
        return ShoppingStatus.Open;
    }
  }
}
