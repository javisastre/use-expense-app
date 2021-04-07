import React from "react";
import { useState, useEffect } from "react";

import Menu from "./Menu";
import expenseService from "../../services/expenseservices";

const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const newBalance = await expenseService.getTotalBalance();
        console.log(newBalance);
        setBalance(newBalance);
      } catch (error) {
        console.log(error);
      }
    };

    getBalance();
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
          <p>Current Month: {balance} €</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
