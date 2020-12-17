import React, { useState } from "react";


function DropDownItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="dropDown-item">
      <p  className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </p>
      {open && props.children}
    </li>
  );
}

export default DropDownItem;
