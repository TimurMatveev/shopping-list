import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  Self,
  TemplateRef,
  Type,
  ViewChild,
} from '@angular/core';
import { FilterConfig } from "../../../../services/list/list.types";
import { MatDialog } from "@angular/material/dialog";
import { BaseFilterModalDirective, FilterModalData } from "../../directives/base-filter-modal.directive";
import { FILTER_MODAL } from "../../filter.providers";
import { takeUntil } from "rxjs";
import { DestroyService } from "../../../../services/destroy/destroy.service";

@Component({
  selector: 'sl-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class FilterComponent {
  @Input() public filters: FilterConfig[] = [];

  @Output() public filterChange: EventEmitter<FilterConfig[]> =
    new EventEmitter<FilterConfig[]>();

  @ViewChild('formTemplate', { read: TemplateRef }) private readonly formTemplate!: TemplateRef<{}>;

  constructor(
    private matDialog: MatDialog,
    @Self() private destroyed$: DestroyService,
    @Inject(FILTER_MODAL) private filterModalDirective: Type<BaseFilterModalDirective>,
  ) {
  }

  public openFilterModal(): void {
    this.matDialog
      .open<BaseFilterModalDirective, FilterModalData, FilterConfig[]>(
        this.filterModalDirective,
        {
          data: {
            filters: this.filters,
          },
        },
      )
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe((filters?: FilterConfig[]) => {
        if (!filters) {
          return;
        }

        this.filterChange.emit(filters);
      });
  }
}
