import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sl-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  @Input() diameter: number = 40;

  @Input() isLoading: boolean | null = null;
}
