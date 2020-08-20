import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/authContext";
import GuestContext from "../../context/guestContext/guestContext";

const Navbar = ({ title, icon }) => {
  const { logout, clearError, userAuth, user } = useContext(AuthContext);
  const { clearGuests } = useContext(GuestContext);

  const onLogout = () => {
    logout();
    clearGuests();
    clearError();
  };

  const userLinks = (
    <Fragment>
      <li>Hello, {user && user.name}</li>
      <span className="sm-hide">|</span>
      <li>
        <a href="#!" onClick={onLogout}>
          <span className="sm-hide">Logout</span>{" "}
          <i className="fas fa-sign-out-alt"></i>
        </a>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <span className="sm-hide">|</span>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar">
      <div className="logo">
        <h1>
          <i className={icon} />
          {title}
        </h1>
        <p>Made with MERN Stack</p>
      </div>
      <ul>{userAuth ? userLinks : authLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Party RSVP",
  icon: "fas fa-glass-cheers",
};

export default Navbar;
