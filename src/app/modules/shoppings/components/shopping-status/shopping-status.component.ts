import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ShoppingStatus } from "../../model/shopping.constants";

@Component({
  selector: 'sl-shopping-status[status]',
  templateUrl: './shopping-status.component.html',
  styleUrls: ['./shopping-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingStatusComponent {
  @Input() public status!: ShoppingStatus;

  public readonly labelMap: Record<ShoppingStatus, string> = {
    [ShoppingStatus.Open]: 'shoppings.status.open',
    [ShoppingStatus.Pending]: 'shoppings.status.pending',
    [ShoppingStatus.Completed]: 'shoppings.status.completed',
  };

  public readonly colorMap: Record<ShoppingStatus, string> = {
    [ShoppingStatus.Open]: '#4CAF50',
    [ShoppingStatus.Pending]: '#2196F3',
    [ShoppingStatus.Completed]: '#FF5252',
  };
}
