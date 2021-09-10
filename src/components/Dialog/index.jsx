import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import Button from '../Button';

function Dialog({
  action, children, onClose, render, show, title,
}) {
  return (show)
    ? (
      <div className="tbg-dialog__black-drop">
        <div className="tbg-dialog">
          {title && <div className="tbg-dialog__header">{title}</div>}
          {render ?? (
          <>
            <div className="tbg-dialog__content">{children}</div>
            <div className="tbg-dialog__actions">{action ?? (<Button label="Close" onClick={onClose} />)}</div>
          </>
          )}
        </div>
      </div>
    )
    : null;
}

Dialog.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node,
  onClose: PropTypes.func,
  render: PropTypes.node,
  show: PropTypes.bool,
  title: PropTypes.string,
};

Dialog.defaultProps = {
  action: null,
  children: null,
  onClose: () => null,
  render: null,
  show: false,
  title: null,
};

export default Dialog;
