import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CategoryCreateModalComponent } from "../modals";
import { Observable } from "rxjs";
import { Category } from "../model";
import { CategoryEditModalComponent } from "../modals/category-edit-modal/category-edit-modal.component";

@Injectable()
export class CategoryModalService {
  constructor(
    private matDialog: MatDialog,
  ) {
  }

  public openCreateModal(): Observable<Category | undefined> {
    return this.matDialog
      .open<CategoryCreateModalComponent, void, Category>(
        CategoryCreateModalComponent,
        {
          disableClose: true,
          autoFocus: false,
        }
      )
      .afterClosed();
  }

  public openEditModal(category: Category): Observable<Category | undefined> {
    return this.matDialog
      .open<CategoryEditModalComponent, Category, Category>(
        CategoryEditModalComponent,
        {
          disableClose: true,
          autoFocus: false,
          data: category,
        },
      )
      .afterClosed();
  }
}
