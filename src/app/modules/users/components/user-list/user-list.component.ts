import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';
import { trackById } from "../../../../shared/helpers/track-by.helper";
import { ListEvent } from "../../../../shared/services/list";
import { User } from "../../model";

@Component({
  selector: 'sl-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input() public users: User[] = [];

  @Output() public editUser: EventEmitter<ListEvent<User>> = new EventEmitter<ListEvent<User>>();

  @Output() public deleteUser: EventEmitter<ListEvent<User>> = new EventEmitter<ListEvent<User>>();

  public readonly trackByUser: TrackByFunction<User> = trackById;
}
