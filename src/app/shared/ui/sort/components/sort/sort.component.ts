import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TrackByFunction
} from '@angular/core';
import { ListSortParams } from "../../../../services/list";
import { SortItemDirective } from "../../directives/sort-item.directive";
import { trackByField } from "../../../../helpers/track-by.helper";
import { ApiListSortDirection } from "../../../../types/api-list.types";

@Component({
  selector: 'sl-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortComponent {
  @Input() public sortParams: ListSortParams | null = null;

  @Output() public sortChange: EventEmitter<ListSortParams | null> = new EventEmitter<ListSortParams | null>();

  @ContentChildren(SortItemDirective) public sortItems!: QueryList<SortItemDirective>;

  public readonly trackBySortItem: TrackByFunction<SortItemDirective> = trackByField<SortItemDirective>('key');

  public setSortKey(key: string): void {
    if (!this.sortParams || this.sortParams.sort !== key) {
      this.sortChange.emit({
        sort: key,
        direction: ApiListSortDirection.Asc,
      });

      return;
    }

    if (this.sortParams.direction === ApiListSortDirection.Asc) {
      this.sortChange.emit({
        sort: key,
        direction: ApiListSortDirection.Desc,
      });
    } else {
      this.sortChange.emit(null);
    }
  }

  public getSortIcon(key: string): string {
    if (!this.sortParams || this.sortParams.sort !== key) {
      return '';
    }

    return this.sortParams.direction === ApiListSortDirection.Asc ? 'arrow_downward' : 'arrow_upward';
  }
}
