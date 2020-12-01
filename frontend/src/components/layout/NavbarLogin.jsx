import React, {useRef} from "react";
import { NavLink, Link } from "react-router-dom";
import Modal from '../posts/templates/Modal';
import "../../css/Components/layout/layout.css"

function NavbarLogin() {

  const modalRef = useRef()
  const openModal = () => {
    modalRef.current.openModal()
  }

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

            <NavLink to="/Modal" onClick={openModal} activeClassName="active-link">
              New Post
            </NavLink>
            <Modal ref={modalRef}/>
            
          </li>
        </ul>
      </div>
      <div></div>
    </nav>
  );
}

export default NavbarLogin;
