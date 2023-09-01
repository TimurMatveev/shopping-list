import { Component, ContentChild, Input, TrackByFunction } from '@angular/core';
import {
  ExpansionItemActionsDirective,
  ExpansionItemBodyDirective,
  ExpansionItemHeadDirective
} from "../../directives";
import { ExpansionItemContext } from "../../expandable-list.types";
import { MatExpansionPanel } from "@angular/material/expansion";

@Component({
  selector: 'sl-expandable-list[trackBy]',
  templateUrl: './expandable-list.component.html',
  styleUrls: ['./expandable-list.component.scss']
})
export class ExpandableListComponent<T> {
  @Input() public multi: boolean = true;

  @Input() public items: T[] | null = null;

  @Input() public trackBy!: TrackByFunction<T>;

  @ContentChild(ExpansionItemHeadDirective) public expansionItemHead?: ExpansionItemHeadDirective<T>;

  @ContentChild(ExpansionItemBodyDirective) public expansionItemBody?: ExpansionItemBodyDirective<T>;

  @ContentChild(ExpansionItemActionsDirective) public expansionItemActions?: ExpansionItemActionsDirective<T>;

  public createExpansionContext(item: T, index: number, panel: MatExpansionPanel): ExpansionItemContext<T> {
    return {
      $implicit: item,
      index,
      panel,
    };
  }
}
