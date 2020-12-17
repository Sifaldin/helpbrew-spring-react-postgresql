import React from "react";


function DropDownProfile(props) {
  return (
    <nav className="dropDown">
      <ul className="dropDown-nav">{props.children}</ul>
    </nav>
  );
}

export default DropDownProfile;
