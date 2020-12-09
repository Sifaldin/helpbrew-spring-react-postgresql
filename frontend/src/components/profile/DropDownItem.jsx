import React, { useState } from 'react'

function DropDownItem(props,status) {
    
    const [open, setOpen] = useState(false);
    
    return (
        <li className="dropDown-item">
            <a href="#" className="icon-button"
            onClick={() => setOpen(!open)}>
                {props.icon}
            </a>
            
            {open && props.children}
            
        </li>
    )
}

export default DropDownItem
