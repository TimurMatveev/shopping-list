import { ChangeDetectionStrategy, Component, Inject, Self } from '@angular/core';
import { BehaviorSubject, finalize, takeUntil } from "rxjs";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DestroyService } from "../../../../shared/services/destroy/destroy.service";
import { Shopping, ShoppingService } from "../../model";
import { User } from "../../../users";

export type ShoppingShareModalData = {
  shopping: Shopping;
};

@Component({
  selector: 'sl-shopping-share-modal',
  templateUrl: './shopping-share-modal.component.html',
  styleUrls: ['./shopping-share-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class ShoppingShareModalComponent {
  public readonly formId: string = 'shopping-share-modal';

  public readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private shoppingService: ShoppingService,
    private matDialogRef: MatDialogRef<Shopping>,
    @Self() private destroyed$: DestroyService,
    @Inject(MAT_DIALOG_DATA) public data: ShoppingShareModalData,
  ) {
  }

  public close(shopping?: Shopping): void {
    this.matDialogRef.close(shopping);
  }

  public shareShopping(users: User[]): void {
    this.isLoading$.next(true);

    this.shoppingService.share(this.data.shopping, users)
      .pipe(
        finalize(() => this.isLoading$.next(false)),
        takeUntil(this.destroyed$),
      )
      .subscribe((shared: Shopping) => this.close(shared));
  }
}
