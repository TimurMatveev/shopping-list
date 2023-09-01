import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';
import { ListSortParams } from "../../../../shared/services/list/list.types";
import { Language } from "../../../../../assets/i18n";
import { trackBySelf } from "../../../../shared/helpers/track-by.helper";

@Component({
  selector: 'sl-category-sort',
  templateUrl: './category-sort.component.html',
  styleUrls: ['./category-sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorySortComponent {
  @Input() public sortParams: ListSortParams | null = null;

  @Output() public sortChange: EventEmitter<ListSortParams | null> = new EventEmitter<ListSortParams | null>();

  public readonly languages: Language[] = Object.values(Language);

  public readonly trackByLanguage: TrackByFunction<Language> = trackBySelf;
}
