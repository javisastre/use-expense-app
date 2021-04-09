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
    const isIncome = category === "Salary" ? true : false;

    try {
      await expenseservices.createExpense(amount, category, isIncome);
    } catch (error) {
      console.log(error);
    }
    setAmount(0);
    setCategory("");
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <form onSubmit={formSubmit}>
        <input type='number' min='0' value={amount} onInput={handleInput} />
        <p>Expense category:</p>
        <input
          type='radio'
          checked={category === "Bar/Cafeteria"}
          value='Bar/Cafeteria'
          name='expense'
          onChange={handleCategory}
        />{" "}
        Bar/Cafeteria
        <input
          type='radio'
          checked={category === "Restaurant"}
          value='Restaurant'
          name='expense'
          onChange={handleCategory}
        />{" "}
        Restaurant
        <input
          type='radio'
          checked={category === "Grocery Store"}
          value='Grocery Store'
          name='expense'
          onChange={handleCategory}
        />{" "}
        Grocery Store
        <input
          type='radio'
          checked={category === "Transport"}
          value='Transport'
          name='expense'
          onChange={handleCategory}
        />{" "}
        Transport
        <p>Income category:</p>
        <input
          type='radio'
          checked={category === "Salary"}
          value='Salary'
          name='expense'
          onChange={handleCategory}
        />{" "}
        Salary
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddExpense;
