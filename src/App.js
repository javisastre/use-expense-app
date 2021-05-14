import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import AddExpense from "./components/AddExpense";
import Activity from "./components/Activity";
import EditExpense from "./components/EditExpense";
import Overview from "./components/Overview/Overview";
import Timeline from "./components/Timeline";
import NavBar from "./components/Navbar/NavBar";

import expenseService from "./services/expenseservices";

const App = () => {
  const [balance, setBalance] = useState(0);
  const [activities, setActivities] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const getAllActivities = async () => {
      try {
        const allActivities = await expenseService.getAllExpenses();

        allActivities.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setActivities(allActivities);

        const newBalance = allActivities.reduce((acc, element) => {
          const newAcc = element.isIncome
            ? acc + element.amount
            : acc - element.amount;
          return newAcc;
        }, 0);
        setBalance(newBalance);
      } catch (error) {
        console.log(error);
      }
    };
    getAllActivities();
  }, [update]);

  return (
    <div className='App'>
      <NavBar parentBalance={balance} />

      <Switch>
        <Route exact path='/'>
          <Activity
            update={update}
            setUpdate={setUpdate}
            activities={activities}
          />
        </Route>
        <Route exact path='/addexpense'>
          <AddExpense update={update} setUpdate={setUpdate} />
        </Route>
        <Route exact path='/expense/:id'>
          <EditExpense update={update} setUpdate={setUpdate} />
        </Route>
        <Route exact path='/overview'>
          <Overview activities={activities} />
        </Route>
        <Route exact path='/timeline'>
          <Timeline activities={activities} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
