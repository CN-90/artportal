import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faUserPlus,
  faPortrait,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import './Navbar.scss';
import { logoutUser } from './../../actions/userActions';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  const onClickHandler = () => {
    setShowMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand-ctn" style={{ color: 'black' }}>
        <Link to="/">
          <h1 className="navbar__brand">ART PORTAL</h1>
          <p> &nbsp;&nbsp; A community for creatives.</p>
        </Link>
      </div>
      <ul className="navbar__options">
        {!userInfo ? (
          <>
            <li className="navbar_option">
              <NavLink
                className="navbar_link"
                exact
                to="/signin"
                activeClassName="selected"
              >
                <FontAwesomeIcon className="userIcon" size="1x" icon={faUser} />
                Sign In
              </NavLink>
            </li>
            <li className="navbar_option">
              <NavLink
                className="navbar_link"
                exact
                to="/signup"
                activeClassName="selected"
              >
                <FontAwesomeIcon
                  className="userIcon"
                  size="1x"
                  icon={faUserPlus}
                />
                Sign Up
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="navbar_username">{userInfo.username}</li>
            <li
              onClick={() => setShowMenu(!showMenu)}
              className="navbar_userImage"
            >
              <img src={userInfo.userImage.imageUrl} alt="" />
            </li>
            {showMenu ? (
              <li className="navbar_menu-ctn">
                <div className="navbar_menu">
                  <ul>
                    <Link
                      onClick={onClickHandler}
                      to={`/profile/${userInfo._id}`}
                    >
                      <li className="navbar_menu-item">
                        <FontAwesomeIcon icon={faPortrait} size="lg" />
                        Profile
                      </li>
                    </Link>
                    <li onClick={logoutHandler} className="navbar_menu-item">
                      <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                      Logout
                    </li>
                  </ul>
                </div>
              </li>
            ) : null}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
