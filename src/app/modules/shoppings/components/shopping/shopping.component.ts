import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Shopping } from "../../model";

@Component({
  selector: 'sl-shopping[shopping]',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingComponent {
  @Input() public shopping!: Shopping;
}
