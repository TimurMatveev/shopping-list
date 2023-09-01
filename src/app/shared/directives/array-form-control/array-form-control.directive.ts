import { Directive, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

export type IntersectionHandler = (entry: IntersectionObserverEntry) => void;

@Directive({
  selector: '[slArrayFormControl]',
  exportAs: 'ArrayFormControl',
})
export class ArrayFormControlDirective<T> {
  @Input('slArrayFormControl') public arrayControl!: FormControl<T[]>;

  public addItem(item: T): void {
    if (!item) {
      return;
    }

    this.arrayControl.setValue([
      ...this.arrayControl.value,
      item,
    ]);
  }

  public removeItem(index: number): void {
    this.arrayControl.setValue([
      ...this.arrayControl.value.slice(0, index),
      ...this.arrayControl.value.slice(index + 1),
    ]);
  }

  // public onChipAdded(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim().toLowerCase();
  //
  //   if (value) {
  //     this.categoryForm.controls.tags.setValue([
  //       ...this.categoryForm.controls.tags.value,
  //       value,
  //     ]);
  //   }
  //
  //   event.chipInput.clear();
  // }
}
