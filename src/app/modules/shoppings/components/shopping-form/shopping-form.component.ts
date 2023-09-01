import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output, TrackByFunction,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Product, ShoppingCreate, ShoppingShort } from "../../model";
import { User } from "../../../users";
import { Category } from "../../../categories";
import { trackBySelf } from "../../../../shared/helpers/track-by.helper";

export type ProductCategoryForm = {
  products: FormControl<string[]>;
  category: FormControl<Category['key']>;
}

export type ShoppingForm = {
  name: FormControl<string>;
  categories: FormArray<FormGroup<ProductCategoryForm>>;
}

@Component({
  selector: 'sl-shopping-form[formId]',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingFormComponent implements OnInit {
  @Input() public formId!: string;

  @Input() public shopping?: ShoppingShort;

  @Output() public submitted: EventEmitter<Omit<ShoppingCreate, 'userId'>> = new EventEmitter();

  public readonly minProductsCount: number = 1;

  public readonly trackByName: TrackByFunction<string> = trackBySelf;

  public readonly shoppingForm: FormGroup<ShoppingForm> = new FormGroup<ShoppingForm>({
    name: new FormControl<string>(
      '',
      {
        nonNullable: true,
        validators: [Validators.required],
      }
    ),
    categories: new FormArray<FormGroup<ProductCategoryForm>>(
      [],
      { validators: [Validators.minLength(this.minProductsCount)] },
    ),
  });

  public ngOnInit(): void {
    const { products, userId, ...shopping } = this.shopping || {};

    const categories: { category: Category['key'], products: string[] }[] = products
      ? Array.from(products.entries()).map(([category, products]) => ({
        category,
        products: products.map(({ name }) => name),
      }))
      : [];

    this.shoppingForm.patchValue({
      ...shopping,
      categories,
    }, { emitEvent: false });
  }

  public createCategoryFormGroup = (
    value?: { category: Category['key'], products: string[] }
  ): FormGroup<ProductCategoryForm> => {
    return new FormGroup<ProductCategoryForm>({
      category: new FormControl<Category['key']>(
        value?.category || '',
        { nonNullable: true, validators: [Validators.required] },
      ),
      products: new FormControl<string[]>(
        value?.products || [],
        { nonNullable: true, validators: [Validators.minLength(1)] },
      ),
    });
  }

  public onSubmit(): void {
    if (this.shoppingForm.invalid) {
      return;
    }

    const { categories, ...shopping } = this.shoppingForm.getRawValue();

    const products: Map<Category['key'], Product[]> = categories
      .reduce((map, { category, products }) => {
        map.set(category, [
          ...(map.get(category) || []),
          ...products.map((name: string) => ({ name })),
        ]);

        return map;
      }, new Map());

    this.submitted.emit({ ...shopping, products });
  }
}
