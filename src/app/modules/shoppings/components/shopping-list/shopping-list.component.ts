import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';
import { trackById } from "../../../../shared/helpers/track-by.helper";
import { ListEvent } from "../../../../shared/services/list";
import { ShoppingShort } from "../../model";

@Component({
  selector: 'sl-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListComponent {
  @Input() public shoppings: ShoppingShort[] = [];

  @Output() public editShopping: EventEmitter<ListEvent<ShoppingShort>> = new EventEmitter<ListEvent<ShoppingShort>>();

  @Output() public deleteShopping: EventEmitter<ListEvent<ShoppingShort>> = new EventEmitter<ListEvent<ShoppingShort>>();

  public readonly trackByShopping: TrackByFunction<ShoppingShort> = trackById;
}
