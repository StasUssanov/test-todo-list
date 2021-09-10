import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Routes from './Routes';
import Sidebar from './components/Sidebar';
import { authIsAuth } from './store/auth/selectors';
import MainHeader from './components/MainHeader';

function App({ isAuth }) {
  return (
    <BrowserRouter>
      {isAuth && (<MainHeader />)}
      <div className={classNames('tbg-content', { 'tbg-content--sing-in-form': !isAuth })}>
        {isAuth && (<Sidebar />)}
        <Suspense fallback={<div>Loading</div>}>
          <Routes />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

App.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return ({
    isAuth: authIsAuth(state),
  });
}

export default connect(mapStateToProps)(App);
