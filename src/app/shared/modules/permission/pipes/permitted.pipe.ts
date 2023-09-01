import { Pipe, PipeTransform } from "@angular/core";
import { Observable } from "rxjs";

import { PermissionArea, PermissionService } from "../model";

@Pipe({
  name: 'slPermitted',
})
export class PermittedPipe implements PipeTransform {
  constructor(
    private permissionService: PermissionService,
  ) {
  }

  public transform(area: PermissionArea, value: number): Observable<boolean> {
    return this.permissionService.hasPermission(area, value);
  }
}
