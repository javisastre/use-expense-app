import React from "react";
import { useState, useEffect } from "react";

import Menu from "./Menu";

const Navbar = ({ parentBalance }) => {
  const [display, setDisplay] = useState(false);

  const toggleMenu = () => setDisplay(!display);

  return (
    <div className='navbar'>
      {display ? (
        <div>
          <div className='navbar-top'>
            <p onClick={toggleMenu}>X</p>
            <p>Current Month: {parentBalance} €</p>
          </div>
          <Menu toggle={toggleMenu} />
        </div>
      ) : (
        <div className='navbar-top'>
          <p onClick={toggleMenu}>-</p>
          <p>Current Month: {parentBalance} €</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
