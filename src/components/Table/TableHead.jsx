import React from 'react';
import PropTypes from 'prop-types';

function TableHead({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={`table-head-index${index}`}>
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
  ).isRequired,
};

export default TableHead;
