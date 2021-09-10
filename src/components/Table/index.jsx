import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import TableHead from './TableHead';
import TableBody from './TableBody';

function Table({ columns, values }) {
  return (
    <table className="tbg-table">
      {(columns.length > 0) && <TableHead columns={columns} />}
      <TableBody values={values} />
    </table>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
  ),
  values: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

Table.defaultProps = {
  columns: [],
};

export default Table;
