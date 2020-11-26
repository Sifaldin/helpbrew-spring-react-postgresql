import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ onLogout }) {
  return (
    <nav >
      <a  href="/">
        <img  src="/images/harvest_logo.jpg" alt="logo" />
      </a>
      <button
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span ></span>
      </button>

      <div  id="navbarColor01">
        <ul >
          <li >
            <NavLink exact to="/"  activeClassName="active-link">
              Home
            </NavLink>
          </li>

          <li >
            <NavLink exact to="/posts"  activeClassName="active-link">
              Posts
            </NavLink>
          </li>

          <li >
            <NavLink
              exact
              to="/posts/new"
              
              activeClassName="active-link">
              New Post
            </NavLink>
          </li>

          <li >
            <NavLink exact to="/chat"  activeClassName="active-link">
              Chat
            </NavLink>
          </li>

          <li >
            <button  onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div ></div>
    </nav>
  );
}

export default Navbar;
