import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

function Button({ label, onClick, type }) {
  return (
    <button
      className="tbg-button"
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
  label: 'Button',
  onClick: () => null,
  type: 'button',
};

export default Button;
