import { ChangeDetectionStrategy, Component, Input, TrackByFunction } from '@angular/core';
import { ShoppingShort } from "../../model";
import { trackById } from "../../../../shared/helpers/track-by.helper";
import { User } from "../../../users";

@Component({
  selector: 'sl-shopping-list-item[shopping]',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListItemComponent {
  @Input() public shopping!: ShoppingShort;

  public readonly trackByUser: TrackByFunction<User> = trackById;
}
