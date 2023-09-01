import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';
import { RouterBreadcrumb } from "../../../../services/router-breadcrumbs/router-breadcrumbs.types";
import { trackByField, trackBySelf } from "../../../../helpers/track-by.helper";
import { Language } from "../../../../../../assets/i18n";
import { User } from "../../../../../modules/users";

@Component({
  selector: 'header[sl-header][user]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() user!: User;

  @Output() logout: EventEmitter<void> = new EventEmitter<void>();

  public readonly trackByBreadcrumb: TrackByFunction<RouterBreadcrumb> = trackByField<RouterBreadcrumb>('url');

  public readonly trackByLanguage: TrackByFunction<Language> = trackBySelf;

  public readonly languages: Language[] = Object.values(Language);
}
