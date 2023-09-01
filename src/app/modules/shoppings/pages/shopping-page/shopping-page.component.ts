import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { ConfirmModalService } from "../../../../shared/ui/confirm-modal/services/confirm-modal.service";
import { TranslateService } from "@ngx-translate/core";
import { DestroyService } from "../../../../shared/services/destroy/destroy.service";
import { ShoppingModalService } from "../../services";
import { filter, switchMap, takeUntil } from "rxjs";
import { PatchLoader } from "../../../../shared/helpers/loader.helper";
import { ActivatedRoute } from "@angular/router";
import { Product, Shopping, ShoppingMapper, ShoppingService, ShoppingShort } from "../../model";
import { AuthService } from "../../../../shared/modules/auth";
import { ProductBoughtChangeEvent } from "../../components";
import { Category } from "../../../categories";

@Component({
  selector: 'sl-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DestroyService,
  ],
})
export class ShoppingPageComponent {
  public shoppingLoader: PatchLoader<Shopping> = this.activatedRoute.snapshot.data['shoppingLoader'];

  public editMode: boolean = true;

  public totalBoughtPart: number = 0;

  constructor(
    public shoppingService: ShoppingService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private shoppingModalService: ShoppingModalService,
    private confirmModalService: ConfirmModalService,
    private translateService: TranslateService,
    @Self() private destroyed$: DestroyService,
  ) {
  }

  public onShareShopping(shopping: Shopping): void {
    this.shoppingModalService
      .openShareModal(shopping)
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe((shopping?: Shopping) => {
        debugger;
      });
  }

  public onEditShopping(shopping: Shopping): void {
    this.activatedRoute.data
      .pipe(
        switchMap(({userId}) =>
          this.shoppingModalService.openEditModal(ShoppingMapper.shortenModel(shopping), userId)),
        takeUntil(this.destroyed$),
      )
      .subscribe((updated?: ShoppingShort) => {
        if (updated) {
          const { id, userId, shareWith, implementerId, ...patch } = updated;
          this.shoppingLoader.patchValue(patch);
        }
      });
  }

  public onDeleteShopping(shopping: Shopping): void {
    this.confirmModalService
      .confirm({
        title: this.translateService.instant('shoppings.delete.confirmTitle'),
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this.shoppingService.delete(shopping.id)),
        takeUntil(this.destroyed$),
      )
      .subscribe(() => {
        debugger;
      });
  }

  public startShopping(shopping: Shopping): void {
    this.editMode = true;
  }

  public cancelShopping(shopping: Shopping): void {
    this.editMode = false;
  }

  public finishShopping(shopping: Shopping): void {
    this.editMode = false;
  }

  public onProductBoughtChange(
    { category, product, bought }: ProductBoughtChangeEvent,
    shopping: Shopping,
  ): void {
    const products: Product[] = (shopping.products.get(category) || [])
      .map((p: Product) => p !== product ? p : { ...p, bought });

    shopping.products.set(category, products);

    this.totalBoughtPart = this.calcTotalBoughtPart(shopping.products);
  }

  private calcTotalBoughtPart(productCategoryMap: Map<Category['key'], Product[]>): number {
    let boughtCount: number = 0;
    let totalCount: number = 0;

    productCategoryMap.forEach((products: Product[]) => {
      products.forEach((product: Product) => {
        totalCount++;

        if (product.bought) {
          boughtCount++;
        }
      });
    });

    return boughtCount / totalCount;
  }
}
