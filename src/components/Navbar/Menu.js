import React from "react";
import { Link } from "react-router-dom";

const Menu = (props) => {
  return (
    <div className='menu'>
      <Link to='/' onClick={props.toggle}>
        Insert New Expense
      </Link>
      <Link to='/activity' onClick={props.toggle}>
        See Activity
      </Link>
      <Link to='/overview' onClick={props.toggle}>
        See Month Overview
      </Link>
      <Link to='/timeline' onClick={props.toggle}>
        See Timeline
      </Link>
    </div>
  );
};

export default Menu;
