import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/api-actions.js';

function NavAuthorizedUser(props) {
  const { userEmail, signOut } = props;
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to="/favorites"
          >
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">
              {userEmail}
            </span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            className="header__nav-link" to="/"
            onClick={(evt) => {
              evt.preventDefault();
              signOut();
            }}
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

NavAuthorizedUser.propTypes = {
  userEmail: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  signOut() {
    dispatch(logout());
  },
});

export {NavAuthorizedUser};
export default connect(null, mapDispatchToProps)(NavAuthorizedUser);
