import React from "react";
import { NavLink, Link } from "react-router-dom";

import "../../css/Components/layout/layout.css"

function Navbar({ onLogout }) {
  return (
    <nav className = "navBar">
    

      <div className="navbar">
      
        <ul>

        <Link to="/">
          <h1>HelpBrew</h1>
        </Link>
        

          <li>
            <NavLink exact to="/" activeClassName="active-link">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              exact
              to="/posts/category/giveaways"
              activeClassName="active-link"
            >
              Giveaways
            </NavLink>
          </li>

          <li>
            <NavLink
              exact
              to="/posts/category/skills"
              activeClassName="active-link"
            >
              Skills
            </NavLink>
          </li>

          <li>
            <NavLink
              exact
              to="/posts/category/monetary-support"
              activeClassName="active-link"
            >
              Monetary Support
            </NavLink>
          </li>

          <li>
            <NavLink exact to="/posts/new" activeClassName="active-link">
              New Post
            </NavLink>
          </li>

          <li>
            <NavLink
              exact
              to="/user"
              activeClassName="active-link"
            >
              Profile Page
            </NavLink>

          </li>

          {/* commented out the chat link for the moment /Elena */}
          {/* <li>
            <NavLink exact to="/chat" activeClassName="active-link">
              Chat
            </NavLink>
          </li> */}

          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        </ul>
      </div>
      <div></div>
    </nav>
  );
}

export default Navbar;
