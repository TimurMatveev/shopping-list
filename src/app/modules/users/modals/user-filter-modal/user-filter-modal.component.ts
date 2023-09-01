import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseFilterModalDirective } from "../../../../shared/ui/filter/directives/base-filter-modal.directive";

@Component({
  selector: 'sl-user-filter-modal',
  templateUrl: './user-filter-modal.component.html',
  styleUrls: ['./user-filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFilterModalComponent extends BaseFilterModalDirective {
  public readonly formId: string = 'user-filter-modal';
}
