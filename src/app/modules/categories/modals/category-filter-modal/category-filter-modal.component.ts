import { ChangeDetectionStrategy, Component, Inject, Self } from '@angular/core';
import { Category, CategoryService } from "../../model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DestroyService } from "../../../../shared/services/destroy/destroy.service";

@Component({
  selector: 'sl-category-filter-modal',
  templateUrl: './category-filter-modal.component.html',
  styleUrls: ['./category-filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFilterModalComponent {
  public readonly formId: string = 'category-filter-modal';

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
}
