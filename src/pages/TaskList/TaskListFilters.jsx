import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { authUserList } from '../../store/auth/selectors';

function TaskListFilters({ users, onChange }) {
  const initState = {};
  const [filters, setFilters] = useState(initState);

  useEffect(() => {
    onChange(filters);
  }, [filters]);

  const statusList = [
    { label: 'None' },
    { label: 'In work', value: 0 },
    { label: 'Complete', value: 1 },
  ];

  const userList = () => {
    const result = [{ label: 'None' }];
    users.forEach((user) => result.push({ label: user.name, value: user.id }));
    return result;
  };

  const handleChangeFilters = ({ key, value }) => {
    setFilters((prevState) => {
      const newState = { ...prevState };
      if (value === 'None') {
        delete newState[key];
      } else {
        newState[key] = Number(value);
      }
      return newState;
    });
  };

  return (
    <>
      <div>
        <span style={{ marginRight: '0.5rem' }}>By user:</span>
        <select
          className="tbg-select"
          value={filters.userId ?? 'None'}
          onChange={({ target }) => handleChangeFilters({ key: 'userId', value: target.value })}
        >
          {userList().map((option) => (
            <option
              key={`select-users-option-${option.value}`}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span style={{ marginRight: '0.5rem' }}>By date:</span>
        <input
          className="tbg-input-text"
          type="date"
          onChange={({ target }) => handleChangeFilters({ key: 'date', value: Date.parse(target.value) })}
        />
      </div>
      <div>
        <span style={{ marginRight: '0.5rem' }}>By status:</span>
        <select
          className="tbg-select"
          value={filters.status ?? 'None'}
          onChange={({ target }) => handleChangeFilters({ key: 'status', value: target.value })}
        >
          {statusList.map((option) => (
            <option
              key={`select-status-option-${option.value}`}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <Button
        label="Reset filters"
        onClick={() => {
          onChange({});
          setFilters({});
        }}
      />
    </>
  );
}

TaskListFilters.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
};

TaskListFilters.defaultProps = {};

function mapStateToProps(state) {
  return ({
    users: authUserList(state),
  });
}

export default connect(mapStateToProps)(TaskListFilters);
