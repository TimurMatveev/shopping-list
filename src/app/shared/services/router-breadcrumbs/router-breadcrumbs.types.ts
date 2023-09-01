import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

export type RouterBreadcrumb = {
  url: string;
  icon?: string;
  label?: string;
  labelI18n?: string;
  disabled?: boolean;
  loading?: boolean;
};

export type RouterBreadcrumbsFactory = (route: ActivatedRoute) => Observable<RouterBreadcrumb[]>;
