import {
  Directive, TemplateRef,
} from "@angular/core";
import { ExpansionItemContext } from "../expandable-list.types";

@Directive({
  selector: '[slExpansionItemActions]'
})
export class ExpansionItemActionsDirective<T> {
  constructor(
    public readonly templateRef: TemplateRef<ExpansionItemContext<T>>
  ) {
  }

  static ngTemplateContextGuard<T>(
    directive: ExpansionItemActionsDirective<T>,
    context: ExpansionItemContext<T>
  ): context is ExpansionItemContext<T> {
    return true;
  }
}
