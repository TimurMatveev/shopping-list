import { ChangeDetectionStrategy, Component, Input, TrackByFunction } from '@angular/core';
import { Category } from "../../model";
import { trackBySelf } from "../../../../shared/helpers/track-by.helper";
import { Language } from "../../../../../assets/i18n";

@Component({
  selector: 'sl-category-list-item[category]',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListItemComponent {
  @Input() public category!: Category;

  public readonly languages: Language[] = Object.values(Language);

  public readonly trackByLanguage: TrackByFunction<Language> = trackBySelf;
}
