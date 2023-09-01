import { Directive, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FilterConfig } from "../../../services/list/list.types";

export type FilterModalData = {
  filters: FilterConfig[];
}

@Directive()
export abstract class BaseFilterModalDirective {
  public readonly abstract formId: string;

  public readonly data: FilterModalData = inject(MAT_DIALOG_DATA);

  protected readonly matDialogRef: MatDialogRef<FilterConfig[]> = inject(MatDialogRef);

  public close(filters?: FilterConfig[]): void {
    this.matDialogRef.close(filters);
  }
}
