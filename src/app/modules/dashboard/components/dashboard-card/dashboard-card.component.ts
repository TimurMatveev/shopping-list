import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sl-dashboard-card, a[slDashboardCard]',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCardComponent {
  @Input() public name: string = '';

  @Input() public imageUrl: string = '';

  @Input() public clickable: boolean = true;
}
