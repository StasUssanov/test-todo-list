import React from 'react';
import PropTypes from 'prop-types';

function TableHead({ values }) {
  return (
    <tbody>
      {values.map((row, i) => (
        <tr key={`table-body-index-${i}`}>
          {Object.keys(row).map((key, j) => (
            <td
              key={`table-body-index-${i}-${j}`}
              children={row[key]}
            />
          ))}
        </tr>
      ))}
    </tbody>
  );
}

TableHead.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableHead;
