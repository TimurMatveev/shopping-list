import { Permission } from "./permission.types";
import { PermissionDto } from "../api";
import { PermissionArea, PermissionValue } from "./permission.constants";
import { UserMapper } from "../../../../modules/users";

export class PermissionMapper {
  static fromDto({ id, permissions }: PermissionDto): Permission {
    return {
      role: UserMapper.getRole(id),
      permissions: Object.values(PermissionArea).reduce(
        (result, permissionArea) => ({
          ...result,
          [permissionArea]: permissions[permissionArea] || PermissionValue.NoPermission,
        }),
        {} as Record<PermissionArea, number>
      ),
    };
  }
}
