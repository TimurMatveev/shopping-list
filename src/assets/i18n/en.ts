const dictionary = {
  common: {
    yes: 'Yes',
    no: 'No',
    login: 'Login',
    logout: 'Logout',
    language: 'Language',
    reset: 'Reset',
    cancel: 'Cancel',
    submit: 'Submit',
    create: 'Create',
    update: 'Update',
    filter: 'Filter',
    email: 'Email',
    gender: {
      title: 'Sex',
      M: 'Male',
      F: 'Female',
      U: 'Unknown',
    },
  },
  language: {
    en: 'English',
    ru: 'Русский',
  },
  auth: {
    login: 'Login',
    signUp: 'Create a new user',
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
      avatar: {
        label: 'User avatar',
        placeholder: 'Enter avatar image url',
      },
      email: {
        label: 'User email',
        placeholder: 'Enter email',
      },
      password: {
        label: 'Password',
        placeholder: 'Enter password',
        hint: '{ count } symbols minimum',
      },
      remember: 'Remember me',
    }
  },
  dashboard: {
    title: 'Dashboard',
  },
  categories: {
    title: 'Categories',
    description: 'Categories module provides functionality for manipulating product categories. Users use categories to group their products in their shopping cart.',
    permissions: {
      all: 'You are permitted to read, create, update and delete categories.',
    },
    empty: {
      title: 'There are no Categories yet',
      hint: 'Try to add new Category',
    },
    create: {
      title: 'Create a new category',
    },
    update: {
      title: 'Update category',
    },
    delete: {
      confirmTitle: 'Are you sure you want to delete the category?',
      confirmBody: 'Users\' shopping lists could have this category as a dependency.\nApplication logic could be broken after the category will be deleted.',
    },
    form: {
      key: {
        label: 'Unique key',
        placeholder: 'Enter key',
        hint: 'Use only lowercase latin and \'_\' symbols',
      },
      name: {
        label: 'Name ({ language })',
        placeholder: 'Enter name ({ language })',
      },
      image: {
        label: 'Image',
        placeholder: 'Enter image url',
      },
      tags: {
        label: 'Tags',
        placeholder: 'Enter tag and press Enter to add new one',
      },
    },
    select: {
      search: 'Search category',
    },
    sort: {
      key: 'Key',
      name: 'Name ({ language })',
    },
    list: {
      total: '{ count } { count, plural, one{ category } other{ categories } }'
    }
  },
  users: {
    title: 'Users',
    description: 'Users module allows to manipulate users data. You can update or delete user.',
    permissions: {
      all: 'As an admin you are permitted to read, update and delete users.',
    },
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
    list: {
      total: '{ count } { count, plural, one{ user } other{ users } }',
    },
    empty: {
      title: 'There are no Users yet',
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
    description: 'Shopping lists module allows to create, read, update and delete your lists. Group your products by categories and feel free to share your lists with other users.',
    created: 'Shopping list creation date',
    updated: 'Shopping list last update date',
    form: {
      name: {
        label: 'Shopping list name',
        placeholder: 'Enter shopping list name',
      },
      user: {
        label: 'User',
      },
      product: {
        add: 'Add new product category',
        category: {
          label: 'Category',
        },
        name: {
          label: 'Products',
          placeholder: 'Enter products',
        },
      }
    },
    own: {
      title: 'Own shopping lists',
      list: {
        total: '{ count } shopping { count, plural, one{ list } other{ lists } }',
      },
      empty: {
        title: 'There are no Shopping lists yet',
        hint: 'Try to add a new one',
        filteredTitle: 'There are no Shopping lists with these filters',
        filteredHint: 'Change the filters or reset them',
      },
      create: {
        title: 'Create a new Shopping list',
      },
      reset: {
        title: 'Reset filters',
      },
    },
    shared: {
      title: 'Shared shopping lists',
      list: {
        total: '{ count } shared shopping { count, plural, one{ list } other{ lists } }',
      },
      empty: {
        title: 'There are no Shared lists yet',
      },
    },
    update: {
      title: 'Update Shopping list',
    },
    delete: {
      confirmTitle: 'Are you sure you want to delete the shopping list?',
    },
    filter: {
      title: 'Filter shopping lists',
      status: {
        label: 'Shopping list status',
        all: 'All statuses',
      },
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
    fields: {
      name: 'Name',
      created: 'Create date',
      updated: 'Last update',
      shared: 'Shared with',
    },
    status: {
      open: 'Opened',
      pending: 'In progress',
      completed: 'Completed',
    },
    share: {
      create: 'Share the list',
      count: '{ count } { count, plural, one{ user } other{ users } }',
      none: 'The list isn\'t shared with anyone',
      one: 'The list is shared with one user',
      many: 'The list is shared with { count } users',
    },
    products: {
      count: '{ count } { count, plural, one{ item } other{ items } }',
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
      pattern: 'Wrong symbols are used',
      maxlength: 'Max length is { requiredLength } symbols',
      minlength: 'Min length is { requiredLength } symbols',
      category: {
        keyExists: 'The category with this key already exists',
      },
    },
    dateRange: {
      hint: 'MM/DD/YYYY – MM/DD/YYYY',
    },
    validating: 'Validating...',
  },
  error: {
    403: 'You don\'t have an access to view this page',
    404: 'Resource not found',
    user: {
      notFoundEmail: 'There is no user with such email',
    },
    goHome: 'Navigate to home page',
    auth: {
      emailNotFound: 'User with this email doesn\'t exist',
      wrongPassword: 'Wrong password',
    },
  },
  confirm: {
    title: 'Are you agree?',
  },
  role: {
    user: 'User',
    admin: 'Admin',
  },
};

export default dictionary;
