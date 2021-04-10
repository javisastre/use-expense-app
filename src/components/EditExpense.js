import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import expenseService from "../services/expenseservices";

const EditExpense = ({ update, setUpdate }) => {
  const expenseId = useParams().id;
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const history = useHistory();

  useEffect(() => {
    const getExpenseData = async () => {
      try {
        const expenseData = await expenseService.getExpense(expenseId);

        setAmount(expenseData.amount);
        setCategory(expenseData.category);
      } catch (error) {
        console.log(error);
      }
    };
    getExpenseData();
  }, []);

  const handleInput = (event) => {
    const value = event.target.validity.valid ? event.target.value : amount;
    setAmount(value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    const isIncome = category === "Salary" ? true : false;

    try {
      await expenseService.updateExpense(expenseId, amount, category, isIncome);
    } catch (error) {
      console.log(error);
    }
    setUpdate(!update);
    history.push("/activity");
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

export default EditExpense;
