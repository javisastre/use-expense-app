import React from "react";
import { useState } from "react";

const AddExpense = () => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const formSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={formSubmit}>
        <input
          type='text'
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default AddExpense;
