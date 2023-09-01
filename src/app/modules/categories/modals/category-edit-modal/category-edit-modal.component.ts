import { ChangeDetectionStrategy, Component, Inject, Self } from '@angular/core';
import { Category, CategoryService } from "../../model";
import { BehaviorSubject, finalize, takeUntil } from "rxjs";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DestroyService } from "../../../../shared/services/destroy/destroy.service";

@Component({
  selector: 'sl-category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class CategoryEditModalComponent {
  public readonly formId: string = 'category-edit-modal';

  public readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private categoryService: CategoryService,
    private matDialogRef: MatDialogRef<Category>,
    @Self() private destroyed$: DestroyService,
    @Inject(MAT_DIALOG_DATA) public category: Category,
  ) {
  }

  public close(category?: Category): void {
    this.matDialogRef.close(category);
  }

  public updateCategory(category: Category): void {
    this.isLoading$.next(true);

    this.categoryService.update({ ...this.category, ...category })
      .pipe(
        finalize(() => this.isLoading$.next(false)),
        takeUntil(this.destroyed$),
      )
      .subscribe((updated: Category) => this.close(updated));
  }
}
