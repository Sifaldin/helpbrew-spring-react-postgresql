import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        <img className="logo-img" src="/images/harvest_logo.jpg" alt="logo" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink exact to="/" className="nav-link" activeClassName="active-link">
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink exact to="/posts" className="nav-link" activeClassName="active-link">
              Posts
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              exact
              to="/posts/new"
              className="nav-link"
              activeClassName="active-link">
              New Post
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink exact to="/chat" className="nav-link" activeClassName="active-link">
              Chat
            </NavLink>
          </li>

          <li className="nav-item">
            <button className="btn btn-outline-info my-2 my-sm-0" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="line"></div>
    </nav>
  );
}

export default Navbar;
