import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import AddExpense from "./components/AddExpense";
import Activity from "./components/Activity";
import EditExpense from "./components/EditExpense";
import Overview from "./components/Overview";
import Timeline from "./components/Timeline";
import NavBar from "./components/Navbar/NavBar";

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

  return (
    <div className='App'>
      <NavBar parentBalance={balance} />

      <Switch>
        <Route exact path='/'>
          <Activity update={update} setUpdate={setUpdate} />
        </Route>
        <Route exact path='/addexpense'>
          <AddExpense update={update} setUpdate={setUpdate} />
        </Route>
        <Route exact path='/expense/:id'>
          <EditExpense update={update} setUpdate={setUpdate} />
        </Route>
        <Route exact path='/overview' component={Overview} />
        <Route exact path='/timeline' component={Timeline} />
      </Switch>
    </div>
  );
};

export default App;
