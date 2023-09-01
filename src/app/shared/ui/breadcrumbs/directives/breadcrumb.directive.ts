import { Directive, TemplateRef } from "@angular/core";

export type BreadcrumbDirectiveContext<T> = {
  $implicit: T;
  breadcrumbs: T[];
  index: number;
}

@Directive({
  selector: '[slBreadcrumb]',
})
export class BreadcrumbDirective<T> {
  constructor(
    public readonly templateRef: TemplateRef<BreadcrumbDirectiveContext<T>>
  ) {
  }

  // static ngTemplateContextGuard(): void {}
}
