import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { Category, CategoryService } from "../../model";
import { BehaviorSubject, finalize, takeUntil } from "rxjs";
import { MatDialogRef } from "@angular/material/dialog";
import { DestroyService } from "../../../../shared/services/destroy/destroy.service";

@Component({
  selector: 'sl-category-create-modal',
  templateUrl: './category-create-modal.component.html',
  styleUrls: ['./category-create-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class CategoryCreateModalComponent {
  public readonly formId: string = 'category-create-modal';

  public readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private categoryService: CategoryService,
    private matDialogRef: MatDialogRef<Category>,
    @Self() private destroyed$: DestroyService,
  ) {
  }

  public close(category?: Category): void {
    this.matDialogRef.close(category);
  }

  public createCategory(category: Category): void {
    this.isLoading$.next(true);

    this.categoryService.create(category)
      .pipe(
        finalize(() => this.isLoading$.next(false)),
        takeUntil(this.destroyed$),
      )
      .subscribe((created: Category) => this.close(created));
  }
}
