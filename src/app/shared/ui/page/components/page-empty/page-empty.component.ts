import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sl-page-empty',
  templateUrl: './page-empty.component.html',
  styleUrls: ['./page-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageEmptyComponent {
  @Input() public title: string = '';

  @Input() public hint?: string;
}
