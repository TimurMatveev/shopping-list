import { ChangeDetectionStrategy, Component, ContentChild, Input, TrackByFunction } from '@angular/core';
import { AbstractBreadcrumbsService } from "../../services/abstract-breadcrumbs.service";
import { trackBySelf } from "../../../../helpers/track-by.helper";
import { BreadcrumbDirective } from "../../directives/breadcrumb.directive";

@Component({
  selector: 'sl-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent<T> {
  @Input() public separator: string = '|';

  @Input() public trackBy: TrackByFunction<T> = trackBySelf;

  @ContentChild(BreadcrumbDirective) public readonly breadcrumbDirective?: BreadcrumbDirective<T>;

  constructor(
    public breadcrumbsService: AbstractBreadcrumbsService<T>,
  ) {
  }
}
