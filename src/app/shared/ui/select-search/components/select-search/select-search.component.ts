import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnDestroy,
  Output,
  Self,
  SkipSelf,
  ViewChild,
} from '@angular/core';
import { MatSelect } from "@angular/material/select";
import { DestroyService } from "../../../../services/destroy/destroy.service";
import { BehaviorSubject, takeUntil } from "rxjs";

@Component({
  selector: 'sl-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class SelectSearchComponent implements AfterViewInit, OnDestroy {
  @Input() public icon: string = 'search';

  @Input() public placeholder: string = '';

  @Input() public loading: boolean = false;

  @Output() public searchChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('searchTop') private searchTop!: ElementRef<HTMLDivElement>

  @ViewChild('searchInput') private searchInput!: ElementRef<HTMLInputElement>;

  public readonly hasShadow$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private intersectionObserver: IntersectionObserver | null = null;

  constructor(
    @Host() @SkipSelf() private matSelect: MatSelect,
    @Self() private destroyed$: DestroyService,
  ) {
  }

  public focus(): void {
    this.searchInput.nativeElement.focus();
  }

  public ngAfterViewInit(): void {
    this.matSelect.openedChange
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe((isOpened) => {
        if (!isOpened) {
          return this.terminateObserver();
        }

        this.intersectionObserver = new IntersectionObserver(([entry]) => {
          this.hasShadow$.next(!entry.isIntersecting);
        }, {
          root: this.matSelect.panel.nativeElement,
          threshold: 0,
          rootMargin: '0px',
        });

        this.intersectionObserver.observe(this.searchTop.nativeElement);
      });
  }

  public ngOnDestroy(): void {
    this.terminateObserver();
  }

  private terminateObserver(): void {
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
  }
}
