import {
  Directive, Input, TemplateRef,
} from "@angular/core";
import { ExpansionItemContext } from "../expandable-list.types";

@Directive({
  selector: '[slExpansionItemBody]'
})
export class ExpansionItemBodyDirective<T> {
  @Input('slExpansionItemBody') public items: T[] = [];

  constructor(
    public readonly templateRef: TemplateRef<ExpansionItemContext<T>>
  ) {
  }

  static ngTemplateContextGuard<T>(
    directive: ExpansionItemBodyDirective<T>,
    context: ExpansionItemContext<T>
  ): context is ExpansionItemContext<T> {
    return true;
  }
}
