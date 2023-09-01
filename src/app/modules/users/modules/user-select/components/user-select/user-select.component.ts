import { ChangeDetectionStrategy, Component, Input, OnInit, Self, TrackByFunction, } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  combineLatest,
  tap
} from 'rxjs';
import { trackById } from "../../../../../../shared/helpers/track-by.helper";
import { FormControl } from "@angular/forms";
import { User, UserService } from "../../../../model";
import {
  FilterPredicate,
  LIST_PAGINATION_LIMIT,
  LIST_SOURCE,
  ListFilterService,
  ListFilterStorageService,
  ListPaginationService,
  ListService,
} from "../../../../../../shared/services/list";
import { DestroyService } from "../../../../../../shared/services/destroy/destroy.service";

@Component({
  selector: 'sl-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: LIST_PAGINATION_LIMIT,
      useValue: 10,
    },
    ListPaginationService,
    ListFilterService,
    ListFilterStorageService,
    ListService,
    {
      provide: LIST_SOURCE,
      useExisting: UserService,
    },
    DestroyService,
  ]
})
export class UserSelectComponent implements OnInit {
  @Input() public control!: FormControl<User['id'] | null>;

  @Input() public label: string = '';

  public readonly search$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public readonly searching$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly trackByUser: TrackByFunction<User> = trackById;

  public users$!: Observable<User[]>;

  public selectedUser$!: Observable<User | null>;

  constructor(
    public userService: UserService,
    public listService: ListService<User>,
    public listFilterService: ListFilterService,
    private listPaginationService: ListPaginationService,
    @Self() private destroyed$: DestroyService,
  ) {
  }

  public ngOnInit(): void {
    this.search$
      .pipe(
        tap(() => this.searching$.next(true)),
        debounceTime(500),
        distinctUntilChanged((a: string, b: string) => {
          if (a === b) {
            this.searching$.next(false);
            return true;
          }

          return false;
        }),
        takeUntil(this.destroyed$),
      )
      .subscribe((search: string) => {
        this.listFilterService.setFilters(search ? [{
          key: 'name',
          predicate: FilterPredicate.RegExp,
          value: search,
        }] : []);
      });

    this.listService.isLoading$
      .pipe(
        filter((isLoading: boolean) => !isLoading),
        takeUntil(this.destroyed$),
      )
      .subscribe(() => this.searching$.next(false));

    this.users$ = this.buildUsers();
    this.selectedUser$ = this.buildSelectedUser();
  }

  private buildUsers(): Observable<User[]> {
    return this.listService.items$;
  }

  private buildSelectedUser(): Observable<User | null> {
    return combineLatest([
      this.control.valueChanges
        .pipe(
          startWith(this.control.value),
          distinctUntilChanged(),
        ),
      this.listService.items$,
    ]).pipe(
      switchMap(([value, users]: [User['id'] | null, User[]]) => {
        if (!value) {
          return of(null);
        }

        const foundUser = users.find(({ id }: User) => value === id);

        return foundUser ? of(foundUser) : this.userService.getItem(value);
      }),
      shareReplay(1),
    );
  }
}
