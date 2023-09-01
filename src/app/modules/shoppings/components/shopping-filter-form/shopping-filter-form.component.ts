import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TrackByFunction,
} from '@angular/core';
import { FilterConfig, FilterPredicate } from "../../../../shared/services/list";
import { FormControl, FormGroup } from "@angular/forms";
import { booleanFilter } from "../../../../shared/helpers/boolean-filter";
import { DateRangeForm } from "../../../../shared/types/date-range-form.types";
import { ShoppingStatus } from "../../model/shopping.constants";
import { trackBySelf } from "../../../../shared/helpers/track-by.helper";

export type ShoppingFilterForm = {
  status: FormControl<ShoppingStatus | null>;
  createdAt: FormGroup<DateRangeForm>;
  updatedAt: FormGroup<DateRangeForm>;
}

export type ShoppingFilterFormData = ReturnType<FormGroup<ShoppingFilterForm>['getRawValue']>;

@Component({
  selector: 'sl-shopping-filter-form[formId]',
  templateUrl: './shopping-filter-form.component.html',
  styleUrls: ['./shopping-filter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingFilterFormComponent implements OnInit {
  @Input() public formId!: string;

  @Input() public filters: FilterConfig[] = [];

  @Output() public submitted: EventEmitter<FilterConfig[]> = new EventEmitter<FilterConfig[]>();

  public readonly shoppingStatuses: ShoppingStatus[] = Object.values(ShoppingStatus);

  public readonly trackByShoppingStatus: TrackByFunction<ShoppingStatus> = trackBySelf;

  public readonly shoppingFilterForm: FormGroup<ShoppingFilterForm> = new FormGroup<ShoppingFilterForm>({
    status: new FormControl<ShoppingStatus | null>(null),
    createdAt: new FormGroup<DateRangeForm>({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    }),
    updatedAt: new FormGroup<DateRangeForm>({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    }),
  });

  public ngOnInit(): void {
    this.shoppingFilterForm.patchValue(ShoppingFilterFormComponent.filtersToFormData(this.filters), { emitEvent: false });
  }

  public onSubmit(): void {
    if (this.shoppingFilterForm.invalid) {
      return;
    }

    this.submitted.emit(ShoppingFilterFormComponent.formDataToFilters(this.shoppingFilterForm.getRawValue()));
  }

  static filtersToFormData(filters: FilterConfig[]): ShoppingFilterFormData {
    const statusFilter = filters
      .find((filter: FilterConfig) => filter.key === 'status' && filter.predicate === FilterPredicate.Equal);

    const createdAtStartFilter = filters
      .find((filter: FilterConfig) => filter.key === 'createdAt' && filter.predicate === FilterPredicate.GreaterThen);

    const createdAtEndFilter = filters
      .find((filter: FilterConfig) => filter.key === 'createdAt' && filter.predicate === FilterPredicate.LessThen);

    const updatedAtStartFilter = filters
      .find((filter: FilterConfig) => filter.key === 'updatedAt' && filter.predicate === FilterPredicate.GreaterThen);

    const updatedAtEndFilter = filters
      .find((filter: FilterConfig) => filter.key === 'updatedAt' && filter.predicate === FilterPredicate.LessThen);

    return {
      status: statusFilter ? (statusFilter.value as ShoppingStatus) : null,
      createdAt: {
        start: createdAtStartFilter ? new Date(createdAtStartFilter.value as number) : null,
        end: createdAtEndFilter ? new Date(createdAtEndFilter.value as number) : null,
      },
      updatedAt: {
        start: updatedAtStartFilter ? new Date(updatedAtStartFilter.value as number) : null,
        end: updatedAtEndFilter ? new Date(updatedAtEndFilter.value as number) : null,
      },
    };
  }

  static formDataToFilters(data: ShoppingFilterFormData): FilterConfig[] {
    const statusFilter: FilterConfig | null = data.status ? {
      value: data.status,
      key: 'status',
      predicate: FilterPredicate.Equal,
    } : null;

    const createdAtStartFilter: FilterConfig | null = data.createdAt.start ? {
      value: data.createdAt.start.valueOf(),
      key: 'createdAt',
      predicate: FilterPredicate.GreaterThen,
    } : null;

    const createdAtEndFilter: FilterConfig | null = data.createdAt.end ? {
      value: data.createdAt.end.valueOf(),
      key: 'createdAt',
      predicate: FilterPredicate.LessThen,
    } : null;

    const updatedAtStartFilter: FilterConfig | null = data.updatedAt.start ? {
      value: data.updatedAt.start.valueOf(),
      key: 'updatedAt',
      predicate: FilterPredicate.GreaterThen,
    } : null;

    const updatedAtEndFilter: FilterConfig | null = data.updatedAt.end ? {
      value: data.updatedAt.end.valueOf(),
      key: 'updatedAt',
      predicate: FilterPredicate.LessThen,
    } : null;

    return [
      statusFilter,
      createdAtStartFilter,
      createdAtEndFilter,
      updatedAtStartFilter,
      updatedAtEndFilter,
    ].filter(booleanFilter);
  }
}
