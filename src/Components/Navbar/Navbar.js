import React from "react";
import { useState } from "react";

import Menu from "./Menu";

const Navbar = () => {
  const [display, setDisplay] = useState(false);

  const toggleMenu = () => setDisplay(!display);

  return (
    <div className='navbar'>
      {display ? (
        <div onClick={toggleMenu}>
          <div className='navbar-top'>
            <p>X</p>
            <p>Current Month: X €</p>
          </div>
          <Menu toggle={toggleMenu} />
        </div>
      ) : (
        <div onClick={toggleMenu} className='navbar-top'>
          <p>-</p>
          <p>Current Month: X €</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
