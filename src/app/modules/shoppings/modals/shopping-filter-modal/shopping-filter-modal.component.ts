import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseFilterModalDirective } from "../../../../shared/ui/filter/directives/base-filter-modal.directive";

@Component({
  selector: 'sl-shopping-filter-modal',
  templateUrl: './shopping-filter-modal.component.html',
  styleUrls: ['./shopping-filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingFilterModalComponent extends BaseFilterModalDirective {
  public readonly formId: string = 'shopping-filter-modal';
}
