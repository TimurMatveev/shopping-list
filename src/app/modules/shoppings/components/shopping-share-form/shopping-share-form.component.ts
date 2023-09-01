import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Product } from "../../model";
import { UserShort } from "../../../users/model/user.types";
import { CategoryService } from "../../../categories";

export type ProductForm = {
  name: FormControl<string>;
  categoryId: FormControl<number>;
}

export type ShoppingForm = {
  name: FormControl<string>;
  userId: FormControl<number>;
  products: FormArray<FormGroup<ProductForm>>;
}

@Component({
  selector: 'sl-shopping-share-form[formId]',
  templateUrl: './shopping-share-form.component.html',
  styleUrls: ['./shopping-share-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingShareFormComponent implements OnInit {
  @Input() public formId!: string;

  @Input() public shareWith: UserShort[] = [];

  @Output() public submitted: EventEmitter<UserShort[]> = new EventEmitter<UserShort[]>();

  public readonly maxUsersCount: number = 5;

  public readonly shoppingShareForm: FormGroup<ShoppingShareForm> = new FormGroup<ShoppingShareForm>({
    name: new FormControl<string>(
      '',
      {
        nonNullable: true,
        validators: [Validators.required],
      }
    ),
    userId: new FormControl<number>(
      {
        value: 0,
        disabled: true,
      },
      {
        nonNullable: true,
        validators: [Validators.required],
      },
    ),
    products: new FormArray<FormGroup<ProductForm>>(
      [],
      { validators: [Validators.minLength(this.minProductsCount)] },
    ),
  });

  constructor(
    public categoryService: CategoryService,
  ) {
  }

  public ngOnInit(): void {
    this.shoppingForm.patchValue({
      ...this.shopping,
      userId: this.user.id,
    }, { emitEvent: false });
  }

  public createProductFormGroup = (product?: Product): FormGroup<ProductForm> => {
    return new FormGroup<ProductForm>({
      name: new FormControl<string>(
        product?.name || '',
        { nonNullable: true, validators: [Validators.required] },
      ),
      categoryId: new FormControl<number>(
        // @ts-ignore
      product?.categoryId || null,
        { nonNullable: true, validators: [Validators.required] },
      ),
    });
  }

  public onSubmit(): void {
    if (this.shoppingForm.invalid) {
      return;
    }

    this.submitted.emit(this.shoppingForm.getRawValue());
  }
}
