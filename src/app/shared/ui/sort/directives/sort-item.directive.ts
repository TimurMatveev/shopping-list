import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[slSortItem]',
})
export class SortItemDirective {
  @Input('slSortItem') public key!: string;

  constructor(
    public readonly templateRef: TemplateRef<{ $implicit: string }>
  ) {
  }
}
