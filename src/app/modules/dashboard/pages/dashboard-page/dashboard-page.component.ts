import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PermissionArea, PermissionValue } from "../../../../shared/modules/permission";

@Component({
  selector: 'sl-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  public readonly permissionArea: typeof PermissionArea = PermissionArea;

  public readonly permissionValue: typeof PermissionValue = PermissionValue;
}
