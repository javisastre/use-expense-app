import React from "react";
import { useState } from "react";

const AddExpense = () => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const handleInput = (event) => {
    const value = event.target.value;
    setAmount(value);
  };

  const formSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={formSubmit}>
        <input type='number' min='0' value={amount} onInput={handleInput} />
      </form>
    </div>
  );
};

export default AddExpense;
