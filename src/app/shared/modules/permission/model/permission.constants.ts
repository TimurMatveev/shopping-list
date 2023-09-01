import { Permission } from "./permission.types";

export const PermissionValue = {
  NoPermission: 0,
  Read: 1,
  Create: 2,
  Update: 4,
  Delete: 8,
  Any: 1 | 2 | 4 | 8,
}

export enum PermissionArea {
  Dashboard = 'dashboard',
  Category = 'category',
  Shopping = 'shopping',
  User = 'user',
}

export const VOID_PERMISSIONS: Permission['permissions'] = Object.values(PermissionArea).reduce(
  (result, permissionArea) => ({
    ...result,
    [permissionArea]: PermissionValue.NoPermission,
  }),
  {} as Permission['permissions'],
);
