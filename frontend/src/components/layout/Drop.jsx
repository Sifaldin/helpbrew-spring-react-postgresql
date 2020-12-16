import React, { useState } from "react";
import { MenuItems } from "./MenuItems";
import "../../css/Components/layout/Drop.css";
import { Link } from "react-router-dom";

function Drop({ ClickStatus }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const ClickHandle = () => {
    setClick(false);
    ClickStatus(false);
  };
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link className={item.cName} to={item.path} onClick={ClickHandle}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Drop;
