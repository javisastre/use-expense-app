import React from "react";
import { useState } from "react";

import Menu from "./Menu";

const Navbar = ({ parentBalance }) => {
  const [display, setDisplay] = useState(false);

  return (
    <div className='navbar'>
      {display ? (
        <div>
          <div className='navbar-top'>
            <p
              onClick={() => {
                setDisplay(!display);
              }}
            >
              X
            </p>
            <p>Current Month: {parentBalance} €</p>
          </div>
          <Menu setDisplay={setDisplay} display={display} />
        </div>
      ) : (
        <div className='navbar-top'>
          <p
            onClick={() => {
              setDisplay(!display);
            }}
          >
            -
          </p>
          <p>Current Month: {parentBalance} €</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
