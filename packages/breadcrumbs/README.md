# Breadcrumbs 🥖can't be tastier

## Installation

To install breadcrumbs from Panenco's registry follow next steps:

1. Create `.npmrc` file with the next content `registry=https://npm.pkg.github.com/Panenco` near to your `package.json` file you want to add this package to
2. `npm install @panenco/breadcrumbs`

## Usage

Before usage, you need to define components that will be used to render parts of breadcrumbs component.

### Wrap App with `BreadcrumbsProvider`

```javascript
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider, createStore } from 'react-redux';
import { BreadcrumbsProvider } from '@panenco/breadcrumbs';

import App from 'containers';

const App = () => (
  <BrowserRouter>
    <Provider store={createStore()}>
      <BreadcrumbsProvider>
        <App />
      </BreadcrumbsProvider>
    </Provider>
  </Router>
);

render(<App />, document.getElementById('root'));
```

### Drop `BreadcrumbsAnchor`

Place `BreadcrumbsAnchor` component on the routes you want to appear in breadcrumbs.

- `path: string`
  Unique path 'level' needed to identify registered breadcrumb item.
- `link: string`
  URL your breadcrumb item click will lead to.
- `component: React.ElementType`
  Any valid React node you like to render inside your `Item` component.
- `itemProps?: object`
  Additional props that will be spreaded to your `Item`component.
- `id?: string`
  You can specify additional branch you want this Anchor to be registered in. This is useful when you need to create couple independent breadcrumbs instances in your app.

```javascript
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { BreadcrumbsAnchor } from '@panenco/breadcrumbs';

import { userPath, ordersPath } from 'constants/urls';

import User from './users';
import Orders from './orders';

const App = ({ match }) => {
  return (
    <React.Fragment>
      <BreadcrumbsAnchor
        link={userPath(match.params?.userId)}
        path={userPath(':userId')}
        component={
          <span title="Conversations">
            <Trans i18nKey="conversations" />
          </span>
        }
      />
      <Switch>
        <Route exact path={userPath(':userId')} component={User} />
        <Route path={ordersPath(':userId')} component={Orders} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
```

### Sprinkle `Breadcrumbs` on the page

```javascript
import React from 'react';
import cx from 'classnames';
import { Breadcrumbs } from '@panenco/breadcrumbs';

import Header from './header';
import s from './styles.scss';

// Define wrapper for Breadcrumbs, by default it's just <div>
const Container = ({ className, children }) => <div className={cx(s.breadcrumbs, className)}>{children}</div>;

// Item wrapper that will be rendered
const Item = ({ link, component, itemProps }) => (
  <Link to={link} className={s.breadcrumbsItem} {...itemProps}>
    {component}
  </Link>
);

const Divider = () => <span className={s.breadcrumbsDivider}>/</span>;

const Layout = ({ component }) => (
  <div className={s.layout}>
    <Header />
    <Breadcrumbs
      components={{
        Item,
        Divider,
        Container,
      }}
    />
    <div className={s.layoutContent}>{content}</div>
  </div>
);

export default Layout;
```

### Voila!
