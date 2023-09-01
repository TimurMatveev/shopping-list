import { RouterBreadcrumb } from "./shared/services/router-breadcrumbs/router-breadcrumbs.types";
import { User } from "./modules/users";
import { Shopping, ShoppingType } from "./modules/shoppings";

export class AppBreadcrumbs {
  static dashboard(disabled?: boolean): RouterBreadcrumb[] {
    return [
      {
        url: '/',
        labelI18n: 'dashboard.title',
        icon: 'home',
        disabled,
      },
    ];
  }

  static categories(disabled?: boolean): RouterBreadcrumb[] {
    return [
      ...AppBreadcrumbs.dashboard(),
      {
        url: '/categories',
        labelI18n: 'categories.title',
        disabled,
      },
    ];
  }

  static users(disabled?: boolean): RouterBreadcrumb[] {
    return [
      ...AppBreadcrumbs.dashboard(),
      {
        url: '/users',
        labelI18n: 'users.title',
        disabled,
      },
    ];
  }

  static user(id: number, user: User |  null, disabled?: boolean): RouterBreadcrumb[] {
    return [
      ...AppBreadcrumbs.users(),
      {
        url: `/users/${ id }`,
        label: user ? user.name : `${ id }`,
        loading: !user,
        disabled,
      },
    ];
  }

  static shoppings(userId: string | number, type: ShoppingType, disabled?: boolean): RouterBreadcrumb[] {
    return [
      ...AppBreadcrumbs.dashboard(),
      {
        url: `/shopping/${ userId }/lists/${ type }`,
        labelI18n: 'shoppings.title',
        disabled,
      },
    ];
  }

  static shopping(
    userId: string | number,
    type: ShoppingType,
    id: number,
    shopping: Shopping | null,
    disabled?: boolean
  ): RouterBreadcrumb[] {
    return [
      ...AppBreadcrumbs.shoppings(userId, type),
      {
        url: `/shopping/${ userId }/lists/${ type }/${ id }`,
        label: shopping ? shopping.name : `${ id }`,
        loading: !shopping,
        disabled,
      },
    ];
  }

  static error(code: number): RouterBreadcrumb[] {
    return [
      ...AppBreadcrumbs.dashboard(),
      {
        url: `${code}`,
        labelI18n: `error.${code}`,
        disabled: true,
      }
    ]
  }
}
