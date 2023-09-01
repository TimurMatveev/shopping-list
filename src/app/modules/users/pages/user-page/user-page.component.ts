import { ChangeDetectionStrategy, Component, Self } from '@angular/core';

import { ConfirmModalService } from "../../../../shared/ui/confirm-modal/services/confirm-modal.service";
import { TranslateService } from "@ngx-translate/core";
import { DestroyService } from "../../../../shared/services/destroy/destroy.service";
import { UserModalService } from "../../services";
import { filter, switchMap, takeUntil } from "rxjs";
import { ListEvent } from "../../../../shared/services/list/list.types";
import { Loader } from "../../../../shared/helpers/loader.helper";
import { ActivatedRoute } from "@angular/router";
import { User, UserService } from "../../model";

@Component({
  selector: 'sl-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DestroyService,
  ],
})
export class UserPageComponent {
  public userLoader: Loader<User> = this.activatedRoute.snapshot.data['userLoader'];

  constructor(
    private activatedRoute: ActivatedRoute,
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
        debugger;
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
      .subscribe(() => {
        debugger;
      });
  }
}
