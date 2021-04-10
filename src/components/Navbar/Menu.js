import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ display, setDisplay }) => {
  return (
    <div className='menu'>
      <Link
        to='/'
        onClick={() => {
          setDisplay(!display);
        }}
      >
        See Activity
      </Link>
      <Link
        to='/addexpense'
        onClick={() => {
          setDisplay(!display);
        }}
      >
        Insert New Expense
      </Link>
      <Link
        to='/overview'
        onClick={() => {
          setDisplay(!display);
        }}
      >
        See Month Overview
      </Link>
      <Link
        to='/timeline'
        onClick={() => {
          setDisplay(!display);
        }}
      >
        See Timeline
      </Link>
    </div>
  );
};

export default Menu;
