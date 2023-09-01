import { ChangeDetectionStrategy, Component, Self, TrackByFunction } from '@angular/core';
import {
  LIST_SOURCE,
  ListEvent,
  ListFilterService,
  ListFilterStorageService,
  ListPaginationService,
  ListService,
  ListSortService,
} from "../../../../shared/services/list";
import { ShoppingService, ShoppingShort } from "../../model";
import { DestroyService } from "../../../../shared/services/destroy/destroy.service";
import { trackById } from "../../../../shared/helpers/track-by.helper";
import { ShoppingModalService } from "../../services";
import { ConfirmModalService } from "../../../../shared/ui/confirm-modal/services/confirm-modal.service";
import { TranslateService } from "@ngx-translate/core";
import { filter, map, Observable, switchMap, takeUntil } from "rxjs";
import { ShoppingListFilterStorageService } from "../../services/shopping-list-filter-storage.service";
import { ShoppingType } from "../../shoppings.constants";
import { ActivatedRoute, Params } from "@angular/router";
import { AuthService } from "../../../../shared/modules/auth";
import { User } from "../../../users";

@Component({
  selector: 'sl-shopping-list-page',
  templateUrl: './shopping-list-page.component.html',
  styleUrls: ['./shopping-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ListService,
    ListPaginationService,
    ListFilterService,
    ListSortService,
    {
      provide: LIST_SOURCE,
      useClass: ShoppingService,
    },
    {
      provide: ListFilterStorageService,
      useClass: ShoppingListFilterStorageService,
    },
    DestroyService,
  ],
})
export class ShoppingListPageComponent {
  public readonly trackByShopping: TrackByFunction<ShoppingShort> = trackById;

  public readonly type$: Observable<ShoppingType> = this.activatedRoute.params
    .pipe(
      map(({ shoppingType }: Params) => shoppingType),
    );

  public readonly shoppingType: typeof ShoppingType = ShoppingType;

  constructor(
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public listService: ListService<ShoppingShort>,
    public listSortService: ListSortService,
    public listFilterService: ListFilterService,
    public listPaginationService: ListPaginationService,
    public shoppingService: ShoppingService,
    private shoppingModalService: ShoppingModalService,
    private confirmModalService: ConfirmModalService,
    private translateService: TranslateService,
    @Self() private destroyed$: DestroyService,
  ) {
  }

  public get userId(): User['id'] {
    return this.activatedRoute.snapshot.data['userId'];
  }

  public onCreateShopping(): void {
    this.shoppingModalService
      .openCreateModal(this.userId)
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe((shopping?: ShoppingShort) => {
        if (!shopping) {
          return;
        }

        this.listService.addItem(shopping);
      });
  }

  public onEditShopping(event: ListEvent<ShoppingShort>): void {
    this.shoppingModalService
      .openEditModal(event.item, this.userId)
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe((shopping?: ShoppingShort) => {
        if (!shopping) {
          return;
        }

        this.listService.updateItem(event.index, shopping);
      });
  }

  public onDeleteShopping(event: ListEvent<ShoppingShort>): void {
    this.confirmModalService
      .confirm({
        title: this.translateService.instant('shoppings.delete.confirmTitle'),
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this.shoppingService.delete(event.item.id)),
        takeUntil(this.destroyed$),
      )
      .subscribe(() => this.listService.deleteItem(event.index));
  }
}
