import { ChangeDetectorRef, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { finalize, map, Observable, of, switchMap, take, tap, timer } from "rxjs";
import { Category, CategoryService } from "../model";

@Injectable()
export class CategoryKeyValidator {
  private readonly debounceMs: number = 500;

  constructor(
    private categoryService: CategoryService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public validateWithExceptions(exceptions: Category['key'][] = []): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value: string = control.value?.trim() || '';

      if (!value || exceptions.includes(value)) {
        return of(null);
      }

      return timer(this.debounceMs)
        .pipe(
          switchMap(() => this.categoryService.isKeyUnique(value)),
          take(1),
          map((isKeyUnique: boolean) => isKeyUnique ? null : { 'category.keyExists': true }),
          tap((error: ValidationErrors | null) => error && control.markAsTouched()),
          finalize(() => this.changeDetectorRef.markForCheck()),
        );
    }
  }
}
