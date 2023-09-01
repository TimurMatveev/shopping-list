import { ChangeDetectionStrategy, Component, Inject, Self } from '@angular/core';
import { BehaviorSubject, finalize, takeUntil } from "rxjs";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DestroyService } from "../../../../shared/services/destroy/destroy.service";
import { ShoppingCreate, ShoppingService, ShoppingShort } from "../../model";
import { User } from "../../../users";

export type ShoppingCreateModalData = {
  userId: User['id'];
  showUser: boolean;
};

@Component({
  selector: 'sl-shopping-create-modal',
  templateUrl: './shopping-create-modal.component.html',
  styleUrls: ['./shopping-create-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class ShoppingCreateModalComponent {
  public readonly formId: string = 'shopping-create-modal';

  public readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private shoppingService: ShoppingService,
    private matDialogRef: MatDialogRef<ShoppingShort>,
    @Self() private destroyed$: DestroyService,
    @Inject(MAT_DIALOG_DATA) public data: ShoppingCreateModalData,
  ) {
  }

  public close(shopping?: ShoppingShort): void {
    this.matDialogRef.close(shopping);
  }

  public createShopping(shopping: Omit<ShoppingCreate, 'userId'>): void {
    this.isLoading$.next(true);

    this.shoppingService.create({ ...shopping, userId: this.data.userId })
      .pipe(
        finalize(() => this.isLoading$.next(false)),
        takeUntil(this.destroyed$),
      )
      .subscribe((created: ShoppingShort) => this.close(created));
  }
}
