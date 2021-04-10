import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import AddExpense from "./components/AddExpense";
import Activity from "./components/Activity";
import EditExpense from "./components/EditExpense";
import Overview from "./components/Overview";
import Timeline from "./components/Timeline";

import expenseService from "./services/expenseservices";

const App = () => {
  const [balance, setBalance] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const newBalance = await expenseService.getTotalBalance();
        setBalance(newBalance);
      } catch (error) {
        console.log(error);
      }
    };

    getBalance();
  }, [update]);

  const updateBalance = () => {
    console.log("hola");
    setUpdate(!update);
  };

  return (
    <div className='App'>
      <Navbar parentBalance={balance} />
      <Switch>
        <Route
          exact
          path='/'
          updateFunction={updateBalance}
          component={AddExpense}
        />
        <Route exact path='/activity' component={Activity} />
        <Route exact path='/expense/:id' component={EditExpense} />
        <Route exact path='/overview' component={Overview} />
        <Route exact path='/timeline' component={Timeline} />
      </Switch>
    </div>
  );
};

export default App;
