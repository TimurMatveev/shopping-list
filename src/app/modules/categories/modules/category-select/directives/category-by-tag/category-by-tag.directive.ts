import { Directive, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Category, CategoryService } from "../../../../model";

@Directive({
  selector: '[slCategoryByTag]',
})
export class CategoryByTagDirective implements OnChanges {
  @Input('slCategoryByTag') public tag: string = '';

  @Output() public tagMatch: EventEmitter<Category['key']> = new EventEmitter<Category["key"]>();

  constructor(
    private categoryService: CategoryService,
  ) {
  }

  public ngOnChanges(): void {
    this.checkTag(this.tag.trim().toLowerCase());
  }

  private checkTag(tag: string): void {
    const categoryKey = this.categoryService.tagsMap.get(tag);

    if (categoryKey) {
      this.tagMatch.emit(categoryKey);
    }
  }
}
