import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';
import { Category } from "../../model";
import { trackById } from "../../../../shared/helpers/track-by.helper";
import { ListEvent } from "../../../../shared/services/list/list.types";

@Component({
  selector: 'sl-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  @Input() public categories: Category[] = [];

  @Input() public canEdit: boolean | null = null;

  @Input() public canDelete: boolean | null = null;

  @Output() public editCategory: EventEmitter<ListEvent<Category>> = new EventEmitter<ListEvent<Category>>();

  @Output() public deleteCategory: EventEmitter<ListEvent<Category>> = new EventEmitter<ListEvent<Category>>();

  public readonly trackByCategory: TrackByFunction<Category> = trackById;
}
