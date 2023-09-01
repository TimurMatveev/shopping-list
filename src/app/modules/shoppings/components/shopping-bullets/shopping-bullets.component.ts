import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from "../../model";
import { AvatarListItem } from "../../../../shared/ui/avatar";
import { booleanFilter } from "../../../../shared/helpers/boolean-filter";
import { Category } from "../../../categories";

@Component({
  selector: 'sl-shopping-bullets',
  templateUrl: './shopping-bullets.component.html',
  styleUrls: ['./shopping-bullets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingBulletsComponent {
  @Input() public products: Map<Category['key'], Product[]> = new Map();

  @Input() limit: number = 4;

  public readonly getCategoriesTooltipText = (avatars: AvatarListItem[]): string => {
    return avatars
      .map(({ name }) => name)
      .filter(booleanFilter)
      .join(', ');
  }
}
