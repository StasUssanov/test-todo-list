import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authCurrentUser } from '../../store/auth/selectors';
import Button from '../Button';
import mutations from '../../store/auth/actions';

function MainHeader({ signOut, user }) {
  return (
    <header className="tbg-main-header">
      <div className="tbg-main-header__username">{user.name}</div>
      <Button
        label="Sign out"
        onClick={signOut}
      />
    </header>
  );
}

MainHeader.propTypes = {
  signOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(state) {
  return ({
    user: authCurrentUser(state),
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    signOut: () => dispatch(mutations.authSignOut()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
