import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NavAuthorizedUser(props) {
  const { userEmail } = props;
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
          <a className="header__nav-link" href="/#">
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

NavAuthorizedUser.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default NavAuthorizedUser;
