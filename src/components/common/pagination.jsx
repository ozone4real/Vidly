import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  render() {
    const { pageSize, currentPage, itemsCount, onPageClick } = this.props;
    const totalPages = Math.ceil(itemsCount / pageSize);
    const pages = [];
    let i = 1;
    while (i <= totalPages) {
      pages.push(i);
      i++;
    }

    if (pages.length === 1) return null;

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map(page => (
            <li
              key={page}
              className={
                currentPage === page ? "page-item active" : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() => {
                  onPageClick(page);
                }}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired
};

export default Pagination;
