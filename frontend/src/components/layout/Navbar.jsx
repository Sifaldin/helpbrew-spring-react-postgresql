// import React, { useRef } from "react";
// import { NavLink, Link } from "react-router-dom";
// import Modal from "../posts/templates/Modal";
// import "../../css/Components/layout/layout.css";
// import logo from "../../assets/logo_small.jpg";

// import DropDownProfile from "../profile/DropDownProfile";
// import DropDownItem from "../profile/DropDownItem";
// import DropDownMenu from "../profile/DropDownMenu";

// function Navbar({ onLogout, user }) {
//   const skillsRef = useRef();
//   const monetRef = useRef();
//   const giveRef = useRef();
//   const newPostRef = useRef();
//   const homeRef = useRef();
//   const profileRef = useRef();

//   const modalRef = useRef();
//   const openModal = () => {
//     modalRef.current.openModal();
//   };

//   return (
//     <nav className="navBar">
//       <div className="navbar">
//         <ul>
//           <Link className="logo-link" to="/">
//             <img src={logo} alt="HelpBrew Logo" />
//           </Link>

//           <li>
//             <NavLink exact to="/" ref={homeRef}>
//               HOME
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               exact
//               to="/posts/category/giveaways"
//               className="post-link"
//               ref={giveRef}
//             >
//               GIVEAWAYS
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               exact
//               to="/posts/category/skills"
//               className="post-link"
//               ref={skillsRef}
//             >
//               SKILLS
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               exact
//               to="/posts/category/monetary-support"
//               className="post-link"
//               ref={monetRef}
//               // onClick={(e) => handleColorChange(e)}
//             >
//               MONETARY SUPPORT
//             </NavLink>
//           </li>

//           <li>
//             <NavLink to="/Modal" onClick={openModal}>
//               NEW POST
//             </NavLink>
//             <Modal ref={modalRef} />
//           </li>

//           {/* <li>
//             <NavLink exact to="/user" ref={profileRef}>
//               PROFILE
//             </NavLink>
//           </li> */}

//           {/* commented out the chat link for the moment /Elena */}
//           {/* <li>
//             <NavLink exact to="/chat" activeClassName="active-link">
//               CHAT
//             </NavLink>
//           </li>

//           <li>
//             <button className={"medium-button"} onClick={onLogout}>
//               Logout
//             </button>
//           </li> */}

//           <DropDownProfile>
//             <DropDownItem>
//               <DropDownMenu user={user} />
//             </DropDownItem>
//           </DropDownProfile>
//         </ul>
//       </div>
//       <div></div>
//     </nav>
//   );
// }

// export default Navbar;
