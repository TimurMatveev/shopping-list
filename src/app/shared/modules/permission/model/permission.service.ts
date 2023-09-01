import { Injectable } from "@angular/core";
import { map, NEVER, Observable, shareReplay, switchMap } from "rxjs";
import { AuthService } from "../../auth";
import { PermissionApiService, PermissionDto } from "../api";
import { Permission } from "./permission.types";
import { PermissionMapper } from "./permission.mapper";
import { PermissionArea, VOID_PERMISSIONS } from "./permission.constants";
import { User, UserRole } from "../../../../modules/users";

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  public readonly permissions$: Observable<Permission['permissions']> = this.authService.user$
    .pipe(
      switchMap((user: User | null) => {
        if (!user) {
          return NEVER;
        }

        return this.getRolePermission(user.role);
      }),
      map((permission: Permission | null) => permission ? permission.permissions : VOID_PERMISSIONS),
      shareReplay(1),
    );

  constructor(
    private permissionApiService: PermissionApiService,
    private authService: AuthService,
  ) {
  }

  public getPermissions(): Observable<Permission[]> {
    return this.permissionApiService.getList()
      .pipe(
        map((permissions: PermissionDto[]) => permissions.map(PermissionMapper.fromDto)),
      );
  }

  public getRolePermission(role: UserRole): Observable<Permission> {
    return this.permissionApiService.getItem(role)
      .pipe(
        map(PermissionMapper.fromDto),
      );
  }

  public hasPermission(area: PermissionArea, value: number): Observable<boolean> {
    return this.permissions$
      .pipe(
        map((permissions: Permission['permissions']) => !!(permissions[area] & value)),
      );
  }

  public hasAllPermissions(area: PermissionArea, value: number): Observable<boolean> {
    return this.permissions$
      .pipe(
        map((permissions: Permission['permissions']) => permissions[area] === value),
      );
  }
}
