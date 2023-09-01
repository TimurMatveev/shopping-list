import { ChangeDetectionStrategy, Component, Self, TrackByFunction } from '@angular/core';
import { trackById } from "../../../../shared/helpers/track-by.helper";
import {
  LIST_SOURCE,
  ListEvent,
  ListFilterService,
  ListFilterStorageService,
  ListPaginationService,
  ListService,
  ListSortService
} from "../../../../shared/services/list";
import { ConfirmModalService } from "../../../../shared/ui/confirm-modal/services/confirm-modal.service";
import { TranslateService } from "@ngx-translate/core";
import { DestroyService } from "../../../../shared/services/destroy/destroy.service";
import { UserModalService } from "../../services";
import { filter, switchMap, takeUntil } from "rxjs";
import { User, UserService } from "../../model";

@Component({
  selector: 'sl-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ListService,
    ListPaginationService,
    ListFilterService,
    ListFilterStorageService,
    ListSortService,
    {
      provide: LIST_SOURCE,
      useClass: UserService,
    },
    DestroyService,
  ],
})
export class UserListPageComponent {
  public readonly trackByUser: TrackByFunction<User> = trackById;

  constructor(
    public listService: ListService<User>,
    public listSortService: ListSortService,
    public listFilterService: ListFilterService,
    public listPaginationService: ListPaginationService,
    public userService: UserService,
    private userModalService: UserModalService,
    private confirmModalService: ConfirmModalService,
    private translateService: TranslateService,
    @Self() private destroyed$: DestroyService,
  ) {
  }

  public onEditUser(event: ListEvent<User>): void {
    this.userModalService
      .openEditModal(event.item)
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe((user?: User) => {
        if (!user) {
          return;
        }

        this.listService.updateItem(event.index, user);
      });
  }

  public onDeleteUser(event: ListEvent<User>): void {
    this.confirmModalService
      .confirm({
        title: this.translateService.instant('users.delete.confirmTitle'),
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this.userService.delete(event.item.id)),
        takeUntil(this.destroyed$),
      )
      .subscribe(() => this.listService.deleteItem(event.index));
  }
}
