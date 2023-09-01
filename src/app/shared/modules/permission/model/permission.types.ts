import { PermissionArea } from "./permission.constants";
import { UserRole } from "../../../../modules/users";

export type Permission = {
  role: UserRole;
  permissions: Record<PermissionArea, number>;
};
