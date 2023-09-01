import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { Category, CategoryService } from "../../model";
import {
  LIST_PAGINATION_LIMIT,
  LIST_SOURCE,
  ListEvent,
  ListPaginationService,
  ListService,
  ListSortService
} from "../../../../shared/services/list";
import { CategoryModalService } from "../../services";
import { DestroyService } from "../../../../shared/services/destroy/destroy.service";
import { filter, switchMap, takeUntil } from "rxjs";
import { ConfirmModalService } from "../../../../shared/ui/confirm-modal/services/confirm-modal.service";
import { TranslateService } from "@ngx-translate/core";
import { PermissionArea, PermissionValue } from "../../../../shared/modules/permission";

@Component({
  selector: 'sl-category-list-page',
  templateUrl: './category-list-page.component.html',
  styleUrls: ['./category-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ListService,
    ListPaginationService,
    ListSortService,
    {
      provide: LIST_SOURCE,
      useClass: CategoryService,
    },
    {
      provide: LIST_PAGINATION_LIMIT,
      useValue: 20,
    },
    DestroyService,
  ],
})
export class CategoryListPageComponent {
  public readonly permissionArea: typeof PermissionArea = PermissionArea;

  public readonly permissionValue: typeof PermissionValue = PermissionValue;

  constructor(
    public listService: ListService<Category>,
    public listSortService: ListSortService,
    public listPaginationService: ListPaginationService,
    public categoryService: CategoryService,
    private categoryModalService: CategoryModalService,
    private confirmModalService: ConfirmModalService,
    private translateService: TranslateService,
    @Self() private destroyed$: DestroyService,
  ) {
  }

  public onCreateCategory(): void {
    this.categoryModalService
      .openCreateModal()
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe((category?: Category) => {
        if (!category) {
          return;
        }

        this.listService.addItem(category);
      });
  }

  public onEditCategory(event: ListEvent<Category>): void {
    this.categoryModalService
      .openEditModal(event.item)
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe((updatedCategory?: Category) => {
        if (!updatedCategory) {
          return;
        }

        this.listService.updateItem(event.index, updatedCategory);
      });
  }

  public onDeleteCategory(event: ListEvent<Category>): void {
    this.confirmModalService
      .confirm({
        title: this.translateService.instant('categories.delete.confirmTitle'),
        body: this.translateService.instant('categories.delete.confirmBody'),
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this.categoryService.delete(event.item.key)),
        takeUntil(this.destroyed$),
      )
      .subscribe(() => this.listService.deleteItem(event.index));
  }
}
