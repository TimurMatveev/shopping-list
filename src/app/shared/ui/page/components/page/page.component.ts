import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { PageWidth } from "../../page.types";

@Component({
  selector: 'sl-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements AfterViewInit, OnDestroy {
  @Input() public width: PageWidth = 'wide';

  @Input() @HostBinding('class.mod-centered') public centered: boolean = false;

  @Output() public scrolledToBottom: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('bottom') private bottomElement!: ElementRef<HTMLDivElement>;

  private observer?: IntersectionObserver;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) {
  }

  public ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        this.scrolledToBottom.emit();
      }
    }, {
      root: this.elementRef.nativeElement,
      threshold: 1,
    });

    this.observer.observe(this.bottomElement.nativeElement);
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = undefined;
  }
}
