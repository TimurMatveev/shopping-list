import { ChangeDetectionStrategy, Component, Inject, Self } from '@angular/core';
import { BehaviorSubject, finalize, takeUntil } from "rxjs";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DestroyService } from "../../../../shared/services/destroy/destroy.service";
import { ShoppingCreate, ShoppingService, ShoppingShort } from "../../model";
import { User } from "../../../users";

export type ShoppingEditModalData = {
  userId: User['id'];
  shopping: ShoppingShort;
  showUser: boolean;
};

@Component({
  selector: 'sl-shopping-edit-modal',
  templateUrl: './shopping-edit-modal.component.html',
  styleUrls: ['./shopping-edit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class ShoppingEditModalComponent {
  public readonly formId: string = 'shopping-edit-modal';

  public readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private shoppingService: ShoppingService,
    private matDialogRef: MatDialogRef<ShoppingShort>,
    @Self() private destroyed$: DestroyService,
    @Inject(MAT_DIALOG_DATA) public data: ShoppingEditModalData,
  ) {
  }

  public close(shopping?: ShoppingShort): void {
    this.matDialogRef.close(shopping);
  }

  public updateShopping(shopping: Omit<ShoppingCreate, 'userId'>): void {
    this.isLoading$.next(true);

    this.shoppingService.update({ ...this.data.shopping, ...shopping, userId: this.data.userId })
      .pipe(
        finalize(() => this.isLoading$.next(false)),
        takeUntil(this.destroyed$),
      )
      .subscribe((updated: ShoppingShort) => this.close(updated));
  }
}
