import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterConfig } from "../../../../shared/services/list";
import { FILTER_MODAL } from "../../../../shared/ui/filter/filter.providers";
import { ShoppingFilterModalComponent } from "../../modals";

@Component({
  selector: 'sl-shopping-filter',
  templateUrl: './shopping-filter.component.html',
  styleUrls: ['./shopping-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: FILTER_MODAL,
      useValue: ShoppingFilterModalComponent,
    },
  ],
})
export class ShoppingFilterComponent {
  @Input() public filters: FilterConfig[] | null = [];

  @Output() public filterChange: EventEmitter<FilterConfig[]> = new EventEmitter<FilterConfig[]>();
}
