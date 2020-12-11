import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Components/layout/Nav.css';
import Drop from './Drop';
import Modal from "../posts/templates/Modal";
import logo from "../../assets/logo_transparent_background_small.png";
import { RiArrowDropDownLine } from 'react-icons/ri';
import DropDownProfile from "../profile/DropDownProfile";
import DropDownItem from "../profile/DropDownItem";
import DropDownMenu from "../profile/DropDownMenu";

function Nav({onLogout, user, setUser}) {
    const skillsRef = useRef();
    const monetRef = useRef();
    const giveRef = useRef();
    const newPostRef = useRef();
    const homeRef = useRef();
    const profileRef = useRef();
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const modalRef = useRef();

    
    const openModal = () => {
        modalRef.current.openModal();
        setClick(false)
    };

    const onMouseEnter = () => {
       
            setDropdown(true);
        
    };

    const onMouseLeave = () => {
       
            setDropdown(false);
        
    };

    return (
        <>
            <nav className='navbar'>
                <Link to='/' onClick={closeMobileMenu}>
                    <img className='navbar-logo' src={logo} alt=""/>
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
            </Link>
                    </li>
                    <li
                        className='nav-item'
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        
                        <div className="nav-links">
                            Posts<RiArrowDropDownLine className="fa-caret-down" alignmentBaseline="mathematical" size="20px"/>
                        
                        </div>
                        {dropdown && <Drop ClickStatus={setClick}/>}
                    </li>
                    
                    <li className='nav-item'>
                        <Link
                            to='/Modal'
                            className='nav-links'
                            onClick={ openModal }
                        >
                            New Post
            </Link>
                        <Modal ref={modalRef} />
                    </li>
                    <li className='nav-item'>
                        {/* <DropDownProfile> */}
                        
                    </li>
                </ul>
                <div className="profile-icon">
                <DropDownItem
                    icon={
                        <img
                            src={user.imageUrl}
                            alt="profile-pic"
                            style={{
                                height: "35px",
                                width: "35px",
                                borderRadius: "20px",
                                marginRight: "5px",
                            }}
                        />
                    }
                >
                    <DropDownMenu user={user} setUser={setUser} />
                </DropDownItem>
                </div>
            </nav>
        </>
    );
}

export default Nav;
