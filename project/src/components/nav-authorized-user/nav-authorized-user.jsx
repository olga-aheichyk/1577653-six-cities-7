import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../store/api-actions.js';
import { getUserAvatarUrl, getUserEmail } from '../../store/user/selectors.js';

function NavAuthorizedUser() {
  const userEmail = useSelector(getUserEmail);
  const userAvatarUrl = useSelector(getUserAvatarUrl);

  const dispatch = useDispatch();
  const signOut = () => dispatch(logout());

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to="/favorites"
          >
            <div className="header__avatar-wrapper user__avatar-wrapper">
              {userAvatarUrl && (<img style={{borderRadius: '50%'}} src={userAvatarUrl} alt="User avatar"/>)}
            </div>
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

export default NavAuthorizedUser;
