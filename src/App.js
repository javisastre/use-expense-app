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
  const [monthList, setMonthList] = useState([]);

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

  useEffect(() => {
    const getMonthList = () => {
      const monthArr = [];
      activities.forEach((activity) => {
        let month = new Date(activity.created_at).getMonth();
        if (!monthArr.includes(month)) {
          monthArr.push(month);
        }
      });
      setMonthList(monthArr);
    };
    getMonthList();
  }, [activities]);

  const monthConverter = (number) => {
    const dictionary = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };

    return dictionary[number];
  };

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
          <Overview
            activities={activities}
            monthList={monthList}
            monthConverter={monthConverter}
          />
        </Route>
        <Route exact path='/timeline'>
          <Timeline activities={activities} monthList={monthList} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
