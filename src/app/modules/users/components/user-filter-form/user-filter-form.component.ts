import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FilterConfig, FilterPredicate } from "../../../../shared/services/list";
import { FormControl, FormGroup } from "@angular/forms";
import { booleanFilter } from "../../../../shared/helpers/boolean-filter";
import { DateRangeForm } from "../../../../shared/types/date-range-form.types";

export type UserFilterForm = {
  createdAt: FormGroup<DateRangeForm>;
  updatedAt: FormGroup<DateRangeForm>;
}

export type UserFilterFormData = ReturnType<FormGroup<UserFilterForm>['getRawValue']>;

@Component({
  selector: 'sl-user-filter-form[formId]',
  templateUrl: './user-filter-form.component.html',
  styleUrls: ['./user-filter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFilterFormComponent implements OnInit {
  @Input() public formId!: string;

  @Input() public filters: FilterConfig[] = [];

  @Output() public submitted: EventEmitter<FilterConfig[]> = new EventEmitter<FilterConfig[]>();

  public readonly userFilterForm: FormGroup<UserFilterForm> = new FormGroup<UserFilterForm>({
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
    this.userFilterForm.patchValue(UserFilterFormComponent.filtersToFormData(this.filters), { emitEvent: false });
  }

  public onSubmit(): void {
    if (this.userFilterForm.invalid) {
      return;
    }

    this.submitted.emit(UserFilterFormComponent.formDataToFilters(this.userFilterForm.getRawValue()));
  }

  static filtersToFormData(filters: FilterConfig[]): UserFilterFormData {
    const createdAtStartFilter = filters
      .find((filter: FilterConfig) => filter.key === 'createdAt' && filter.predicate === FilterPredicate.GreaterThen);

    const createdAtEndFilter = filters
      .find((filter: FilterConfig) => filter.key === 'createdAt' && filter.predicate === FilterPredicate.LessThen);

    const updatedAtStartFilter = filters
      .find((filter: FilterConfig) => filter.key === 'updatedAt' && filter.predicate === FilterPredicate.GreaterThen);

    const updatedAtEndFilter = filters
      .find((filter: FilterConfig) => filter.key === 'updatedAt' && filter.predicate === FilterPredicate.LessThen);

    return {
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

  static formDataToFilters(data: UserFilterFormData): FilterConfig[] {
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
      createdAtStartFilter,
      createdAtEndFilter,
      updatedAtStartFilter,
      updatedAtEndFilter,
    ].filter(booleanFilter);
  }
}
