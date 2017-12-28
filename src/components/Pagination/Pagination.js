import React, { Component } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';

import { pagination } from '../../constants';
import './Pagination.css';

class Pagination extends Component {
  static getPager(
    totalItems,
    currentPage = pagination.currentPage,
    pageSize = pagination.pageSize,
  ) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage;
    let endPage;

    if (totalPages <= pagination.pageSize) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= 6) {
      // more than 10 total pages so calculate start and end pages
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + (pageSize - 1), totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      pager: {},
    };

    this.setPage = this.setPage.bind(this);
  }

  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    const { items } = this.props;
    let { pager } = this.state;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = Pagination.getPager(items.length, page);

    // get new page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  render() {
    const { pager } = this.state;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }
    return (
      <div className="Pagination">
        <p className={pager.currentPage === 1 ? 'Pagination--inActive' : 'Pagination--active'}>
          <button onClick={() => this.setPage(1)}>First</button>
        </p>
        <p className={pager.currentPage === 1 ? 'Pagination--inActive' : 'Pagination--active'}>
          <button onClick={() => this.setPage(pager.currentPage - 1)}>Previous</button>
        </p>

        {pager.pages.map((page, index) => {
          const uniqueKey = `page-${index}`;
          return (
            <div
              key={uniqueKey}
              className={pager.currentPage === page ? 'Pagination--inActive' : 'Pagination--active'}
            >
              <button onClick={() => this.setPage(page)}>{page}</button>
            </div>
            );
          })
        }

        <p className={pager.currentPage === pager.totalPages ? 'Pagination--inActive' : 'Pagination--active'}>
          <button onClick={() => this.setPage(pager.currentPage + 1)}>Next</button>
        </p>
        <p className={pager.currentPage === pager.totalPages ? 'Pagination--inActive' : 'Pagination--active'}>
          <button onClick={() => this.setPage(pager.totalPages)}>Last</button>
        </p>
      </div>
    );
  }
}

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
};

const defaultProps = {
  initialPage: 1,
};

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
