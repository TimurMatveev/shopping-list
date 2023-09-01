import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'a[sl-breadcrumb-link]',
  templateUrl: './breadcrumb-link.component.html',
  styleUrls: ['./breadcrumb-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbLinkComponent {
  @Input() public label?: string;

  @Input() public icon?: string;

  @Input() @HostBinding('class.mod-disabled') public disabled?: boolean;

  @Input() @HostBinding('class.mod-loading') public loading?: boolean;

  @Input() @HostBinding('class.mod-dark') darkMode: boolean = false;
}
