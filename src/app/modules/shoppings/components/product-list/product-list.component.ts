import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  HostBinding,
  Input, Output,
  TrackByFunction
} from '@angular/core';
import { KeyValue } from "@angular/common";

import { Product } from "../../model";
import { Category } from "../../../categories";
import { trackByKey, trackBySelf } from "../../../../shared/helpers/track-by.helper";

export type ProductBoughtChangeEvent = {
  category: Category['key'];
  product: Product;
  bought: boolean;
};

@Component({
  selector: 'sl-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input() public products: Map<Category['key'], Product[]> = new Map();

  @Input() public editMode: boolean = false;

  @Input() @HostBinding('style.--category-size.px') public avatarSize: number = 48;

  @Output() public productBoughtChange: EventEmitter<ProductBoughtChangeEvent> =
    new EventEmitter<ProductBoughtChangeEvent>();

  public readonly trackByProductKeyValue: TrackByFunction<KeyValue<Category['key'], Product[]>> = trackByKey;

  public readonly trackByProduct: TrackByFunction<Product> = trackBySelf;
}
