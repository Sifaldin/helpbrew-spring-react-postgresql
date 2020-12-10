import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";

function DropDownItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="dropDown-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

export default DropDownItem;
