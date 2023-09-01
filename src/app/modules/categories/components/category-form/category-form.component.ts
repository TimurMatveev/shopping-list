import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TrackByFunction
} from '@angular/core';
import { Category } from "../../model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Language } from "../../../../../assets/i18n";
import { trackBySelf } from "../../../../shared/helpers/track-by.helper";
import { CATEGORY_KEY_PATTERN } from "../../categories.constants";
import { CategoryKeyValidator } from "../../validators/category-key.validator";

export type CategoryForm = {
  key: FormControl<string>;
  name: FormGroup<Record<Language, FormControl<string>>>;
  image: FormControl<string>;
  tags: FormControl<string[]>;
}

@Component({
  selector: 'sl-category-form[formId]',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CategoryKeyValidator],
})
export class CategoryFormComponent implements OnInit {
  @Input() public formId!: string;

  @Input() public category?: Category;

  @Output() public submitted: EventEmitter<Category> = new EventEmitter<Category>();

  public readonly languages: Language[] = Object.values(Language);

  public readonly trackByLanguage: TrackByFunction<Language> = trackBySelf;

  public readonly trackByTag: TrackByFunction<string> = trackBySelf;

  public readonly keyMaxLength: number = 64;

  public readonly nameMaxLength: number = 128;

  public readonly imageUrlMaxLength: number = 256;

  public categoryForm!: FormGroup<CategoryForm>;

  constructor(
    private categoryKeyValidator: CategoryKeyValidator,
  ) {
  }

  public ngOnInit(): void {
    this.categoryForm = new FormGroup<CategoryForm>({
      key: new FormControl<string>(
        this.category ? this.category.key : '',
        {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.pattern(CATEGORY_KEY_PATTERN),
            Validators.maxLength(this.keyMaxLength),
          ],
          asyncValidators: [
            this.categoryKeyValidator.validateWithExceptions(this.category ? [this.category.key] : []),
          ],
        }
      ),
      name: new FormGroup<Record<Language, FormControl<string>>>(
        this.languages.reduce((record, language) => ({
          ...record,
          [language]: new FormControl<string>(
            this.category ? this.category.name[language] : '',
            {
              nonNullable: true,
              validators: [
                Validators.required,
                Validators.maxLength(this.nameMaxLength),
              ],
            },
          ),
        }), {} as Record<Language, FormControl<string>>)
      ),
      image: new FormControl<string>(
        this.category ? this.category.image : '',
        {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.maxLength(this.imageUrlMaxLength),
          ],
        },
      ),
      tags: new FormControl<string[]>(
        this.category ? Array.from(this.category.tags) : [],
        {
          nonNullable: true,
        },
      ),
    });
  }

  public onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    const { tags, ...value } = this.categoryForm.getRawValue();

    this.submitted.emit({
      ...value,
      tags: new Set<string>(tags),
    });
  }
}
