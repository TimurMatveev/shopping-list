import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ListSortParams } from "../../../../shared/services/list/list.types";

@Component({
  selector: 'sl-user-sort',
  templateUrl: './user-sort.component.html',
  styleUrls: ['./user-sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSortComponent {
  @Input() public sortParams: ListSortParams | null = null;

  @Output() public sortChange: EventEmitter<ListSortParams | null> = new EventEmitter<ListSortParams | null>();
}
