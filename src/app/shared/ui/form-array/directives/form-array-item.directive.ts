import { Directive, Input, TemplateRef } from "@angular/core";
import { AbstractControl, FormArray, FormGroup } from "@angular/forms";

export type FormArrayItemContext<T, G extends FormGroup> = {
  $implicit: G;
  index: number;
}

@Directive({
  selector: '[slFormArrayItem]',
})
export class FormArrayItemDirective<T, G extends FormGroup> {
  @Input('slFormArrayItem') formArray!: FormArray<G>;

  constructor(
    public readonly templateRef: TemplateRef<FormArrayItemContext<T, G>>
  ) {
  }

  static ngTemplateContextGuard<T, G extends FormGroup>(
    directive: FormArrayItemDirective<T, G>,
    context: FormArrayItemContext<T, G>
  ): context is FormArrayItemContext<T, G> {
    return true;
  };}
