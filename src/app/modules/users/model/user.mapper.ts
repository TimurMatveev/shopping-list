import { UserCreateDto, UserDto } from "../api";
import { User, UserCreate } from "./user.types";
import { Gender, UserRole } from "./user.constants";

export class UserMapper {
  static toModel(dto: UserDto): User {
    return {
      avatar: dto.avatar || null,
      createdAt: new Date(dto.createdAt),
      email: dto.email,
      id: dto.id,
      name: dto.name,
      role: UserMapper.getRole(dto.role),
      gender: UserMapper.getGender(dto.gender),
      updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : null,
    };
  }

  static fromPartialModel(model: Partial<User>): Partial<UserDto> {
    return {
      ...(model.avatar ? { avatar: model.avatar } : {}),
      ...(model.name ? { name: model.name } : {}),
      ...(model.email ? { email: model.email } : {}),
      ...(model.id ? { id: model.id } : {}),
      ...(model.createdAt ? { createdAt: model.createdAt.valueOf() } : {}),
      ...(model.updatedAt ? { updatedAt: model.updatedAt.valueOf() } : {}),
      ...(model.gender ? { gender: model.gender } : {}),
      ...(model.role ? { role: model.role } : {}),
    };
  }

  static fromCreateModel({ avatar, ...model }: UserCreate): UserCreateDto {
    return {
      ...model,
      ...(avatar ? { avatar } : {}),
    };
  }

  static getGender(value?: string): Gender {
    switch (value) {
      case Gender.Female:
        return Gender.Female;
      case Gender.Male:
        return Gender.Male;
      default:
        return Gender.Unknown;
    }
  }

  static getRole(value?: string): UserRole {
    switch (value) {
      case UserRole.Admin:
        return UserRole.Admin;
      case UserRole.User:
      default:
        return UserRole.User;
    }
  }
}
