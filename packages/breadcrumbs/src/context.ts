import { createContext } from 'react';

export interface BreadcrumbsItemRoute {
  link: string;
  path: string;
  component: React.ElementType;
  itemProps?: object;
}

export interface BreadcrumbsRoutesMap {
  [key: string]: BreadcrumbsItemRoute[];
}

export interface BreadcrumbsContext {
  routes: BreadcrumbsRoutesMap;
  register(route: BreadcrumbsItemRoute, id: string): void;
  unregister(route: BreadcrumbsItemRoute, id: string): void;
  update(route: BreadcrumbsItemRoute, id: string): void;
}

export const BreadcrumbsContext = createContext<BreadcrumbsContext>({
  routes: {},
  register: () => {},
  unregister: () => {},
  update: () => {},
});
