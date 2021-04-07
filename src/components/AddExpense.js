import React from "react";
import { useState } from "react";
import expenseservices from "./../services/expenseservices";

const AddExpense = () => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const handleInput = (event) => {
    const value = event.target.value;
    setAmount(value);
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    try {
      await expenseservices.createExpense(amount, category);
    } catch (error) {
      console.log(error);
    }
    setAmount(0);
  };

  return (
    <div>
      <form onSubmit={formSubmit}>
        <input type='number' min='0' value={amount} onInput={handleInput} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddExpense;
