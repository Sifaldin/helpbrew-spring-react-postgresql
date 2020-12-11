import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";

function DropDownItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="dropDown-item">
      {/* <a href="/profile" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a> */}
      <p  className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </p>
      {open && props.children}
    </li>
  );
}

export default DropDownItem;
