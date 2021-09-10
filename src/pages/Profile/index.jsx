import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authCurrentUser } from '../../store/auth/selectors';

function Profile({ user }) {
  return (
    <main>
      <h2>My Profile</h2>
      <div className="tbg-profile">
        <div className="tbg-profile__avatar">User Avatar</div>
        <div className="tbg-profile__user-data">
          <h4>User Information</h4>
          <table>
            <tbody>
              {Object.keys(user).map((key) => (
                <tr key={`profile-row-${key}`}>
                  <td style={{ fontWeight: 600 }}>{`${key}:`}</td>
                  <td>{user[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    password: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(state) {
  return ({
    user: authCurrentUser(state),
  });
}

export default connect(mapStateToProps)(Profile);
