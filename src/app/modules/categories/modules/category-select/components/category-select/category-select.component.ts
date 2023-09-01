import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TrackByFunction,
} from '@angular/core';
import { BehaviorSubject, map, Observable, combineLatest, startWith } from 'rxjs';
import { Category, CategoryService } from "../../../../model";
import { trackByField, trackById } from "../../../../../../shared/helpers/track-by.helper";
import { TranslateService } from "@ngx-translate/core";
import { FormControl } from "@angular/forms";
import { Language } from "../../../../../../../assets/i18n";

@Component({
  selector: 'sl-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorySelectComponent implements OnInit {
  @Input() public control!: FormControl<Category['key'] | null>;

  @Input() public label: string = '';

  public readonly search$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public readonly trackByCategory: TrackByFunction<Category> = trackByField<Category>('key');

  public categories$!: Observable<Category[]>;

  public selectedCategory$!: Observable<Category | null>;

  constructor(
    private translateService: TranslateService,
    private categoryService: CategoryService,
  ) {
  }

  public ngOnInit(): void {
    this.categories$ = this.buildCategories();
    this.selectedCategory$ = this.buildSelectedCategory();
  }

  private buildCategories(): Observable<Category[]> {
    return combineLatest([
      this.categoryService.all$,
      this.search$
    ]).pipe(
      map(([categories, search]: [Category[], string]) => {
        if (!search) {
          return categories;
        }

        return categories.filter((category: Category) => {
          const name = category.name[this.translateService.currentLang as Language];
          return name.toLowerCase().includes(search);
        });
      }),
    );
  }

  private buildSelectedCategory(): Observable<Category | null> {
    return combineLatest([
      this.categoryService.all$,
      this.control.valueChanges.pipe(startWith(this.control.value))
    ]).pipe(
      map(([categories, selectedKey]: [Category[], Category['key'] | null]) => {
        if (!selectedKey) {
          return null;
        }

        return categories.find(({ key }) => key === selectedKey) || null;
      }),
    );
  }
}
