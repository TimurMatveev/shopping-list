import { ChangeDetectionStrategy, Component, Inject, Self } from '@angular/core';
import { BehaviorSubject, finalize, takeUntil } from "rxjs";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DestroyService } from "../../../../shared/services/destroy/destroy.service";
import { User, UserService } from "../../model";
import { UserFormData } from "../../components/user-form/user-form.component";

@Component({
  selector: 'sl-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class UserEditModalComponent {
  public readonly formId: string = 'user-edit-modal';

  public readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private userService: UserService,
    private matDialogRef: MatDialogRef<User>,
    @Self() private destroyed$: DestroyService,
    @Inject(MAT_DIALOG_DATA) public user: User,
  ) {
  }

  public close(user?: User): void {
    this.matDialogRef.close(user);
  }

  public updateUser(userData: UserFormData): void {
    this.isLoading$.next(true);

    this.userService.update(this.user.id, userData)
      .pipe(
        finalize(() => this.isLoading$.next(false)),
        takeUntil(this.destroyed$),
      )
      .subscribe((updated: User) => this.close(updated));
  }
}
