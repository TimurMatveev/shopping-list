import { Pipe, PipeTransform } from "@angular/core";
import { Observable } from "rxjs";

import { PermissionArea, PermissionService } from "../model";

@Pipe({
  name: 'slPermittedAll',
})
export class PermittedAllPipe implements PipeTransform {
  constructor(
    private permissionService: PermissionService,
  ) {
  }

  public transform(area: PermissionArea, value: number): Observable<boolean> {
    return this.permissionService.hasAllPermissions(area, value);
  }
}
