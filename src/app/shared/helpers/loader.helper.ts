import { BehaviorSubject, combineLatest, finalize, map, Observable, shareReplay, startWith, Subject } from "rxjs";

export class Loader<T> {
  private readonly loadingState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public readonly isLoading$: Observable<boolean> = this.loadingState.asObservable();

  public readonly data$: Observable<T | null> = this.getData$();

  constructor(protected stream$: Observable<T>) {}

  protected getData$(): Observable<T | null> {
    return this.stream$.pipe(
      startWith(null),
      shareReplay(1),
      finalize(() => this.loadingState.next(false)),
    );
  }
}

export class PatchLoader<T> extends Loader<T> {
  protected patch$?: Subject<Partial<T>>;

  public patchValue(value: Partial<T>): void {
    this.patch$?.next(value);
  }

  constructor(stream$: Observable<T>) {
    super(stream$);
  }

  protected override getData$(): Observable<T | null> {
    this.patch$ = new Subject<Partial<T>>();

    return combineLatest([
      super.getData$(),
      this.patch$.pipe(startWith({})),
    ]).pipe(
      map(([data, patch]) => data ? { ...data, ...patch } : null),
    );
  }
}
