import React, { useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import Modal from "../posts/templates/Modal";
import "../../css/Components/layout/layout.css";

function Navbar({ onLogout }) {
  const skillsRef = useRef();
  const monetRef = useRef();
  const giveRef = useRef();
  const newPostRef = useRef();
  const homeRef = useRef();
  const profileRef = useRef();

  const modalRef = useRef();
  const openModal = () => {
    modalRef.current.openModal();
  };

  return (
    <nav className="navBar">
      <div className="navbar">
        <ul>
          <Link to="/">
            <h1>HelpBrew</h1>
          </Link>

          <li>
            <NavLink exact to="/" ref={homeRef}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              exact
              to="/posts/category/giveaways"
              className="post-link"
              ref={giveRef}
            >
              Giveaways
            </NavLink>
          </li>

          <li>
            <NavLink
              exact
              to="/posts/category/skills"
              className="post-link"
              ref={skillsRef}
            >
              Skills
            </NavLink>
          </li>

          <li>
            <NavLink
              exact
              to="/posts/category/monetary-support"
              className="post-link"
              ref={monetRef}
              // onClick={(e) => handleColorChange(e)}
            >
              Monetary Support
            </NavLink>
          </li>

          <li>
            <NavLink to="/Modal" onClick={openModal}>
              New Post
            </NavLink>
            <Modal ref={modalRef} />
          </li>

          <li>
            <NavLink exact to="/user" ref={profileRef}>
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
