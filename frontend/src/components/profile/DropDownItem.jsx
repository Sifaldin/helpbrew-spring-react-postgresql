import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";

function DropDownItem(props, status) {
  const [open, setOpen] = useState(false);

  return (
    <li className="dropDown-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        <CgProfile />
      </a>
      {open && props.children}
    </li>
  );
}

export default DropDownItem;
