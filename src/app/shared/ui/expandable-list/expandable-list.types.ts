import { MatExpansionPanel } from "@angular/material/expansion";

export type ExpansionItemContext<T> = {
  $implicit: T,
  index: number;
  panel: MatExpansionPanel;
}
