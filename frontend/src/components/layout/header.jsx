//React core
import React from "react";
import { Link } from "react-router-dom";


import logo from "../../Images/harvest_logo.jpg";

 
export default function Header() {
    

    return (
        <header className={"header"} >
        <a >
        <Link to="/">
            <img src={logo} alt= "logo" />
        </Link>
        </a>
        
    </header>
    );
}