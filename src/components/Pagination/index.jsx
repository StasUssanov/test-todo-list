import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Pagination({
  page, total, onChange, rangeList, range, onChangeRange,
}) {
  const renderPageButton = () => {
    const result = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < (total + 1); i++) {
      result.push(
        <button
          key={`table-paginator-item-${i}`}
          className={classNames('tbg-pagination-item', { 'tbg-pagination-item__selected': (page === i) })}
          onClick={() => onChange(i)}
        >
          {i}
        </button>,
      );
    }
    return result;
  };

  return (
    <div className="tbg-pagination">
      <select
        className="tbg-select"
        value={range}
        onChange={({ target }) => onChangeRange(Number(target.value))}
      >
        {rangeList.map((option) => (
          <option
            key={`pagination-range-item-${option}`}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
      {renderPageButton()}
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  total: PropTypes.number,
  rangeList: PropTypes.arrayOf(PropTypes.number),
  range: PropTypes.number,
  onChange: PropTypes.func,
  onChangeRange: PropTypes.func,
};

Pagination.defaultProps = {
  page: null,
  total: null,
  range: 5,
  rangeList: [1, 5, 10],
  onChange: () => null,
  onChangeRange: () => null,
};

export default Pagination;
