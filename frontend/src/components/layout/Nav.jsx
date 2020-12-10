import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Components/layout/Nav.css';
import Drop from './Drop';
import Modal from "../posts/templates/Modal";
import logo from "../../assets/logo_transparent_background_small.png";
import { RiArrowDropDownLine } from 'react-icons/ri';

function Nav() {
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
                    
                </ul>
               
            </nav>
        </>
    );
}

export default Nav;
