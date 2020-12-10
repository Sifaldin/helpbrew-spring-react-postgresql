import React from "react";
import { useHistory } from "react-router-dom";

function DropDownProfile(props) {
  return (
    <nav className="dropDown">
      <ul className="dropDown-nav">{props.children}</ul>
    </nav>
  );
}

export default DropDownProfile;
