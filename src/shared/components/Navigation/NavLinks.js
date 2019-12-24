import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const { isLoggedIn, userId, logout } = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>All Users</NavLink>
      </li>
      {isLoggedIn &&
      <>
        <li>
          <NavLink to={`/${userId}/places`}>My Places</NavLink>
        </li>
        <li>
          <NavLink to="/places/new">Add Place</NavLink>
        </li>
        <li>
          <button className="info" onClick={logout}>Logout</button>
        </li>
      </>}
      {!isLoggedIn &&
      <li>
        <NavLink to="/auth">Authenticate</NavLink>
      </li>}
    </ul>
  );
};


export default NavLinks;

