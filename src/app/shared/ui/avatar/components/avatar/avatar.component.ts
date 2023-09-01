import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'sl-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnChanges {
  @Input()
  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  size: number = 48;

  @Input() url?: string | null;

  @Input() name?: string | null;

  public imageError: ErrorEvent | null = null;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['url']) {
      this.imageError = null;
    }
  }
}
