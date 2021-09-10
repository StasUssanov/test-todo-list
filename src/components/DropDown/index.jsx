import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import Button from '../Button';

function DropDown({ actionList, label, onAction }) {
  const [show, setShow] = useState(false);

  const el = useRef(null);

  const handleClick = (e) => {
    const isTouch = e.type === 'touchend';
    if (e.type === 'click' && isTouch) return;
    const index = e.path.findIndex((item) => item === el.current);
    if (index < 0) setShow(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('touchend', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchend', handleClick);
    };
  }, []);

  const handleOnClickAction = (value) => {
    onAction(value);
    setShow(false);
  };

  return (
    <div
      ref={el}
      className="tbg-drop-down"
    >
      <Button
        label={label}
        onClick={() => setShow((prevState) => !prevState)}
      />
      {show && (
        <div className="tbg-drop-down__items">
          {actionList.map((action, i) => (
            <button
              className="tbg-drop-down__button"
              key={`drop-down-item-${i}`}
              onClick={() => handleOnClickAction(action.value)}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

DropDown.propTypes = {
  actionList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  label: PropTypes.string,
  onAction: PropTypes.func,
};

DropDown.defaultProps = {
  label: 'DropDown',
  onAction: () => null,
};

export default DropDown;
