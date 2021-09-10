import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { authIsAuth } from './store/auth/selectors';

import SignIn from './pages/SignIn';
import NoMatch from './pages/NoMatch';
import TaskList from './pages/TaskList';
import Profile from './pages/Profile';

export const ROUTE_HOME = '/';
export const ROUTE_PROFILE = '/profile';

function Routes({ isAuth }) {
  if (isAuth === false) {
    return (
      <Switch>
        <Route exact path={ROUTE_HOME} component={SignIn} />
        <Route path="*">
          <Redirect to={ROUTE_HOME} />
        </Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path={ROUTE_HOME} component={TaskList} />
      <Route exact path={ROUTE_PROFILE} component={Profile} />
      <Route path="*" component={NoMatch} />
    </Switch>
  );
}

Routes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return ({
    isAuth: authIsAuth(state),
  });
}

export default connect(mapStateToProps)(Routes);
