import { InjectionToken, Type } from "@angular/core";
import { BaseFilterModalDirective } from "./directives/base-filter-modal.directive";

export const FILTER_MODAL: InjectionToken<Type<BaseFilterModalDirective>> =
  new InjectionToken<Type<BaseFilterModalDirective>>('FILTER_MODAL');
