// Helper to read object's properties as obj['name']
export type ObjectPropByName = Record<string, any>;

/**
 * Data for "Page Link" in SideBar adn other UI elements
 */
export type LinkToPage = {
  icon?: string; // Icon name to use as <AppIcon icon={icon} />
  path?: string; // URL to navigate to
  title?: string; // Title or primary text to display
  subtitle?: string; // Sub-title or secondary text to display
};

// Sorting for Table
export type SortingOrder = 'asc' | 'desc';

// https://jsonplaceholder.typicode.com/todos/1
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// https://jsonplaceholder.typicode.com/users/1
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
