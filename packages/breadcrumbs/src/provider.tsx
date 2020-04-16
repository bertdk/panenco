import * as React from 'react';
import { BreadcrumbsRoutesMap, BreadcrumbsContext, BreadcrumbsItemRoute } from 'context';

export interface BreadcrumbsProviderProps {
  children: React.ElementType;
}

export interface BreadcrumbsProviderState {
  routes: BreadcrumbsRoutesMap;
}

class BreadcrumbsProvider extends React.Component<BreadcrumbsProviderProps, BreadcrumbsProviderState> {
  static contextType = BreadcrumbsContext;

  static displayName = 'Breadcrumbs🥖Provider';

  state = {
    routes: {
      _default: [],
    },
  };

  register = (route: BreadcrumbsItemRoute, id: string) => {
    this.setState(state => ({
      routes: {
        ...state.routes,
        [id]: [...state.routes[id], route],
      },
    }));
  };

  unregister = (route: BreadcrumbsItemRoute, id: string) => {
    this.setState(state => ({
      routes: {
        ...state.routes,
        [id]: state.routes[id].filter(rt => rt.path !== route.path),
      },
    }));
  };

  update = (route: BreadcrumbsItemRoute, id: string) => {
    this.setState(state => ({
      routes: {
        ...state.routes,
        [id]: state.routes[id].map(rt => (rt.path === route.path ? route : rt)),
      },
    }));
  };

  render() {
    return (
      <BreadcrumbsContext.Provider
        value={{ routes: this.state.routes, register: this.register, unregister: this.unregister, update: this.update }}
      >
        {this.props.children}
      </BreadcrumbsContext.Provider>
    );
  }
}

export { BreadcrumbsProvider };
