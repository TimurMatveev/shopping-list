import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'sl-page-loading',
  templateUrl: './page-loading.component.html',
  styleUrls: ['./page-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLoadingComponent {
  @Input() @HostBinding('class.mod-overlay') public overlay: boolean | null = false;

  @Input() public diameter: number | null = null;
}
