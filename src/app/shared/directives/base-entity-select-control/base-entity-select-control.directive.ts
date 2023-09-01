import { Directive, OnInit } from "@angular/core";
import { ListSource } from "../../services/list/list.providers";
import { BehaviorSubject, finalize, map, Observable, switchMap } from "rxjs";
import { ListParams, PageableList } from "../../services/list/list.types";
import { MatSelect } from "@angular/material/select";
import { BaseFormFieldControlDirective } from "../base-form-field-control/base-form-field-control.directive";

@Directive()
export abstract class BaseEntitySelectControlDirective<T, V> extends BaseFormFieldControlDirective<V | null> implements OnInit {
  protected readonly abstract select: MatSelect;

  public abstract toValue(option: T): V;

  public params$!: Observable<ListParams>;

  public options$!: Observable<T[]>;

  public readonly loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  protected constructor(
    controlType: string,
    protected listSource: ListSource<T>,
  ) {
    super(controlType);
  }

  public ngOnInit(): void {
    this.params$ = this.buildParams();
    this.options$ = this.buildOptions();
  }

  protected abstract buildParams(): Observable<ListParams>;

  protected buildOptions(): Observable<T[]> {
    return (this.params$ || this.buildParams())
      .pipe(
        switchMap((params: ListParams) => {
          this.loading$.next(true);
          return this.listSource.getList(params).pipe(finalize(() => this.loading$.next(false)));
        }),
        map((list: PageableList<T>) => list.items),
      );
  }
}
