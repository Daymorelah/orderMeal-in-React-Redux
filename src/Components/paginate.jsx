import React from 'react';
import PropTypes from 'prop-types';

const paginate = ({
  pagination: { currentPage, numberOfPages, }, getPage
}) => {
  const paginationToRender = [];
  for (let i = 1; i <= numberOfPages; i += 1) {
    const style = i === currentPage ? 'active' : '';
    paginationToRender.push(
      <span
        key={i}
        className={style}
        tabIndex={0}
        role="button"
        onKeyPress={() => { getPage(i); }}
        onClick={() => { getPage(i); }}
      >
        {i}
      </span>
    );
  }
  return (
    <section id="paginate-container">
      <div id="paginate">
        <span
          tabIndex={0}
          role="button"
          onKeyPress={() => { getPage(1); }}
          onClick={() => { getPage(1); }}
        >
          &laquo;
        </span>
        {paginationToRender}
        <span
          tabIndex={0}
          role="button"
          onKeyPress={() => { getPage(numberOfPages); }}
          onClick={() => { getPage(numberOfPages); }}
        >
          &raquo;
        </span>
      </div>
    </section>
  );
};

paginate.propTypes = {
  pagination: PropTypes.objectOf(PropTypes.number).isRequired,
  getPage: PropTypes.func.isRequired,
};

export default paginate;
