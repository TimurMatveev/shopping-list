import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterConfig } from "../../../../shared/services/list/list.types";
import { FILTER_MODAL } from "../../../../shared/ui/filter/filter.providers";
import { UserFilterModalComponent } from "../../modals/user-filter-modal/user-filter-modal.component";

@Component({
  selector: 'sl-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: FILTER_MODAL,
      useValue: UserFilterModalComponent,
    },
  ],
})
export class UserFilterComponent {
  @Input() public filters: FilterConfig[] | null = [];

  @Output() public filterChange: EventEmitter<FilterConfig[]> = new EventEmitter<FilterConfig[]>();
}
