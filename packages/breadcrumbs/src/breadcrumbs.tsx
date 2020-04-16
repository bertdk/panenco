import * as React from 'react';
import { BreadcrumbsItemRoute, BreadcrumbsContext } from 'context';

export interface BreadcrumbsProps {
  components: {
    Item: React.ComponentType<BreadcrumbsItemRoute>;
    Divider: keyof JSX.IntrinsicElements | React.ComponentType | React.ComponentType<any>;
    Container: keyof JSX.IntrinsicElements | React.ComponentType | React.ComponentType<any>;
  };
  id?: string;
}

const ItemFallback: React.FunctionComponent<BreadcrumbsItemRoute> = ({ link, path, component, itemProps }) => (
  <div {...itemProps}>{component}</div>
);
const DividerFallback: React.FunctionComponent = () => <span>/</span>;
const ContainerFallback = 'div';

export const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = ({
  components: { Item = ItemFallback, Divider = DividerFallback, Container = ContainerFallback } = {},
  id = '_default',
  ...props
}) => {
  const {
    routes: { [id]: items },
  } = React.useContext(BreadcrumbsContext);

  const breadcrumbs = items.map((item, i) => (
    <React.Fragment key={`breadcrumbs_${id}_${item.path}`}>
      {React.createElement(Item, item)}
      {i + 1 !== items.length && React.createElement(Divider)}
    </React.Fragment>
  ));

  return React.createElement(Container as any, props, breadcrumbs);
};

Breadcrumbs.displayName = 'Breadcrumbs🥖';
