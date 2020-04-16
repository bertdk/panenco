import * as React from 'react';

interface ComponentState {
  perPage: number;
  sort: {
    sort: string;
    direction: string;
  };
  filter?: string;
}

const withTable = WrappedComponent =>
  class extends React.Component<any, ComponentState> {
    static displayName = `withTable(${WrappedComponent})`; // eslint-disable-line

    constructor(props) {
      super(props);
      this.state = {
        perPage: 10,
        sort: {
          sort: '',
          direction: '',
        },
      };

      this.handleSort = this.handleSort.bind(this);
      this.handlePagination = this.handlePagination.bind(this);
      this.handleFilter = this.handleFilter.bind(this);
    }

    handleSort(sort, direction) {
      this.setState(state => {
        if (direction === 'desc') {
          return {
            sort: {
              sort,
              direction: 'asc',
            },
          };
        }
        return {
          sort: {
            sort,
            direction: 'desc',
          },
        };
      });
    }

    handlePagination(item) {
      this.setState({
        perPage: item.value,
      });
    }

    handleFilter(filter) {
      this.setState({
        filter,
      });
    }

    render() {
      const { sort, perPage, filter } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          sort={sort}
          perPage={perPage}
          filter={filter}
          handleSort={this.handleSort}
          handlePagination={this.handlePagination}
          handleFilter={this.handleFilter}
        />
      );
    }
  };

export default withTable;
