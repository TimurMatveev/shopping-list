import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ListSortParams } from "../../../../shared/services/list";

@Component({
  selector: 'sl-shopping-sort',
  templateUrl: './shopping-sort.component.html',
  styleUrls: ['./shopping-sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingSortComponent {
  @Input() public sortParams: ListSortParams | null = null;

  @Output() public sortChange: EventEmitter<ListSortParams | null> = new EventEmitter<ListSortParams | null>();
}
