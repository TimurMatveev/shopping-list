import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';
import { trackBySelf } from "../../../../helpers/track-by.helper";
import { Language } from "../../../../../../assets/i18n";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../../auth";
import { LocaleService } from "../../../../services/locale/locale.service";
import { User } from "../../../../../modules/users";

@Component({
  selector: 'sl-user-menu[user]',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent {
  @Input() user!: User;

  @Output() logout: EventEmitter<void> = new EventEmitter<void>();

  public readonly trackByLanguage: TrackByFunction<Language> = trackBySelf;

  public readonly languages: Language[] = Object.values(Language);

  constructor(
    public authService: AuthService,
    public translateService: TranslateService,
    public localeService: LocaleService,
  ) {
  }
}
