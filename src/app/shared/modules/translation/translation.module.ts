import { Inject, NgModule } from '@angular/core';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { from, map } from "rxjs";
import { LOCAL_STORAGE } from "../../providers/local-storage/local-storage.provider";
import { Language } from "../../../../assets/i18n";
import { TranslateMessageFormatCompiler } from "ngx-translate-messageformat-compiler";

@NgModule({
	imports: [
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useValue: {
					getTranslation: (lang: string) => from(import(`/src/assets/i18n/${lang}`))
						.pipe(
							map(module => module.default),
						),
				},
			},
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler,
      },
		}),
	],
	exports: [
		TranslateModule,
	],
})
export class TranslationModule {
	private readonly languages: Language[] = Object.values(Language);

	constructor(
		@Inject(LOCAL_STORAGE) private storage: Storage,
		private translateService: TranslateService,
	) {
		this.translateService.onLangChange.subscribe(({ lang }) => {
			this.storageLocale = lang;
		});

		this.setLocale(
			this.storageLocale ||
			this.translateService.getBrowserLang() ||
			Language.En
		);
	}

	private get storageLocale(): string | null {
		return this.storage.getItem('locale');
	}

	private set storageLocale(locale: string | null) {
		if (locale) {
			this.storage.setItem('locale', locale);
		} else {
			this.storage.removeItem('locale');
		}
	}

	private setLocale(locale: string): void {
		this.translateService.use(this.languages.includes(locale as Language) ? locale : Language.En);
	};
}
