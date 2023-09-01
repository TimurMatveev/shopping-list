import { ChangeDetectionStrategy, Component, Input, OnChanges, TrackByFunction } from '@angular/core';
import { trackByField } from "../../../../helpers/track-by.helper";

export type AvatarListItem = {
  key: string | number;
  url?: string;
  name?: string;
}

@Component({
  selector: 'sl-avatar-list',
  templateUrl: './avatar-list.component.html',
  styleUrls: ['./avatar-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarListComponent implements OnChanges {
  @Input() size: number = 36;

  @Input() avatars: AvatarListItem[] | null = null;

  @Input() limit: number = 4;

  @Input() public getTooltipText: (avatars: AvatarListItem[]) => string = () => '';

  public shownAvatars: AvatarListItem[] = [];

  public hiddenAvatars: AvatarListItem[] = [];

  public readonly trackByAvatar: TrackByFunction<AvatarListItem> = trackByField<AvatarListItem>('key');

  public ngOnChanges(): void {
    const avatars = this.avatars || [];

    if (avatars.length <= this.limit) {
      this.shownAvatars = avatars;
      this.hiddenAvatars = [];
    } else {
      this.shownAvatars = avatars.slice(0, this.limit - 1);
      this.hiddenAvatars = avatars.slice(this.limit - 1);
    }
  }
}
