import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { authUserList } from '../../store/auth/selectors';
import mutations from '../../store/auth/actions';

function SignIn({ userList, signIn }) {
  const initFieldsState = { username: '', password: '' };
  const [fields, setFields] = useState(initFieldsState);

  const [isShowAlert, setIsShowAlert] = useState(false);

  const handleChangeFields = ({ target }) => {
    const { name, value } = target;
    setFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const findUser = userList.find((user) => user.username === fields.username) ?? null;

    if (findUser && findUser.password === fields.password) {
      signIn(findUser.id);
    } else {
      setFields((prevState) => ({ ...prevState, password: '' }));
      setIsShowAlert(true);
    }
  };

  const handleOnReset = (e) => {
    e.preventDefault();
    setFields(initFieldsState);
    setIsShowAlert(false);
  };

  return (
    <form
      className="tbg-sign-in"
      onSubmit={handleOnSubmit}
      onReset={handleOnReset}
    >
      <div className="tbg-dialog__header">Authorization</div>
      <input
        className="tbg-input-text"
        type="text"
        placeholder="username"
        name="username"
        value={fields.username}
        onChange={handleChangeFields}
      />
      <input
        className="tbg-input-text"
        type="password"
        placeholder="password"
        name="password"
        value={fields.password}
        onChange={handleChangeFields}
      />
      {isShowAlert && (
        <span className="tbg-sign-in__alert">Invalid username and/or password.</span>
      )}
      <div className="tbg-sign-in__actions">
        <Button
          label="Sign in"
          type="submit"
        />
        <Button
          label="Reset"
          type="reset"
        />
      </div>
    </form>
  );
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    name: PropTypes.string,
  }).isRequired),
};

SignIn.defaultProps = {
  userList: [],
};

function mapStateToProps(state) {
  return ({
    userList: authUserList(state),
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    signIn: (payload) => dispatch(mutations.authSignIn(payload)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
