import React from "react";
import { useState, useEffect } from "react";

import Menu from "./Menu";
import expenseService from "./../../services/expenseServices";

const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const totalAmount = expenseService.getAllExpenses();
    console.log(totalAmount);
    //    setAmount(totalAmount);
  }, []);

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
          <p>Current Month: {amount} €</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
