import { LocalizationDictionary } from './index';
import en from "./en";

const dictionary: LocalizationDictionary = {
  ...en,
  shoppings: {
    ...en.shoppings,
    products: {
      ...en.shoppings.products,
      count: '{ count } { count, plural, one{ позиция } few{ позиции } other{ позиций } }',
    }
  }
};

/*
const dictionary: LocalizationDictionary = {
  common: {
    yes: 'Да',
    no: 'Нет',
    login: 'Войти',
    logout: 'Выйти',
    language: 'Язык',
    reset: 'Reset',
    cancel: 'Cancel',
    submit: 'Submit',
    create: 'Create',
    update: 'Update',
    filter: 'Filter',
  },
  language: {
    en: 'English',
    ru: 'Русский',
  },
  auth: {
    login: 'Login',
    signUp: 'Create new user',
    toggle: {
      toLogin: {
        hint: 'Already have account?',
        action: 'Use email to login',
      },
      toSignUp: {
        hint: 'Don\'t have an account?',
        action: 'Create a new one',
      },
    },
    form: {
      name: {
        label: 'User name',
        placeholder: 'Enter full name',
      },
      email: {
        label: 'User email',
        placeholder: 'Enter email',
      },
      remember: 'Remember me',
    }
  },
  dashboard: {
    title: 'Начальная страница',
  },
  categories: {
    title: 'Категории',
    empty: {
      title: 'There are no Categories yet',
      hint: 'Try to add new Category',
    },
    create: {
      title: 'Create new category',
    },
    delete: {
      confirmTitle: 'Are you sure you want to delete the category?',
      confirmBody: 'Users\' shopping lists could have this category as a dependency. Application logic could be broken after the category deleted',
    },
    update: {
      title: 'Update category',
    },
    form: {
      key: {
        label: 'Category uniq key',
        placeholder: 'Enter key',
        hint: 'Use only lowercase latin and \'_\' symbols',
      },
      name: {
        label: 'Category name ({{ language }})',
        placeholder: 'Enter name ({{ language }})',
      },
      image: {
        label: 'Category icon',
        placeholder: 'Select an icon',
      },
    },
    sort: {
      key: 'Key',
      name: 'Name ({{ language }})',
    },
  },
  users: {
    title: 'Пользователи',
    description: 'Модуль пользователей',
    created: 'Account creation date',
    updated: 'Account last update date',
    form: {
      email: {
        label: 'User email',
        placeholder: 'Enter email',
      },
      name: {
        label: 'User name',
        placeholder: 'Enter full name',
      },
      role: {
        label: 'Select user role',
      },
    },
    empty: {
      title: 'There are no Users yet',
      hint: 'Try to add new User',
    },
    create: {
      title: 'Create a new user',
    },
    update: {
      title: 'Update user',
    },
    delete: {
      confirmTitle: 'Are you sure you want to delete the user?',
    },
    filter: {
      title: 'Filter users',
      createAt: {
        label: 'User creation date range',
        start: {
          placeholder: 'Start date',
        },
        end: {
          placeholder: 'End date',
        },
      },
      updatedAt: {
        label: 'User last update date range',
        start: {
          placeholder: 'Start date',
        },
        end: {
          placeholder: 'End date',
        },
      },
    },
    sort: {
      name: 'Name',
      email: 'Email',
      created: 'Create date',
      updated: 'Last update',
    },
  },
  shoppings: {
    title: 'Shopping lists',
    description: 'Shopping lists module',
    created: 'Shopping list creation date',
    updated: 'Shopping list last update date',
    form: {
      name: {
        label: 'Shopping list name',
        placeholder: 'Enter shopping list name',
      },
    },
    empty: {
      title: 'There are no Shopping lists yet',
      hint: 'Try to add new Shopping list',
    },
    create: {
      title: 'Create a new Shopping list',
    },
    update: {
      title: 'Update Shopping list',
    },
    delete: {
      confirmTitle: 'Are you sure you want to delete the shopping list?',
    },
    filter: {
      title: 'Filter shopping lists',
      createAt: {
        label: 'Shopping list creation date range',
        start: {
          placeholder: 'Start date',
        },
        end: {
          placeholder: 'End date',
        },
      },
      updatedAt: {
        label: 'Shopping list last update date range',
        start: {
          placeholder: 'Start date',
        },
        end: {
          placeholder: 'End date',
        },
      },
    },
    sort: {
      name: 'Name',
      created: 'Create date',
      updated: 'Last update',
    },
  },
  form: {
    error: {
      required: 'The field is required',
      email: 'Email invalid',
      image: {
        url: 'URL is incorrect',
        load: 'Failed to load image',
      },
    },
    dateRange: {
      hint: 'MM/DD/YYYY – MM/DD/YYYY',
    },
  },
  error: {
    user: {
      notFoundEmail: 'There is no user with such email',
    },
  },
  confirm: {
    title: 'Are you agree?',
  },
  role: {
    user: 'User',
    admin: 'Admin',
  },
}
*/
export default dictionary;
