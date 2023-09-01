import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from "../../model";

@Component({
  selector: 'sl-user-list-item[user]',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListItemComponent {
  @Input() public user!: User;
}
