import { Directive, Input, TemplateRef } from "@angular/core";
import { ExpansionItemContext } from "../expandable-list.types";

@Directive({
  selector: '[slExpansionItemHead]'
})
export class ExpansionItemHeadDirective<T> {
  @Input('slExpansionItemHead') public items: T[] = [];

  @Input('slExpansionItemHeadExpanded') public expanded: boolean = false;

  @Input('slExpansionItemHeadDisabled') public disabled: boolean = false;

  constructor(
    public readonly templateRef: TemplateRef<ExpansionItemContext<T>>
  ) {
  }

  static ngTemplateContextGuard<T>(
    directive: ExpansionItemHeadDirective<T>,
    context: ExpansionItemContext<T>
  ): context is ExpansionItemContext<T> {
    return true;
  }
}
