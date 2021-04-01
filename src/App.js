import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar";
import AddExpense from "./Components/AddExpense";
import Activity from "./Components/Activity";
import EditExpense from "./Components/EditExpense";
import Overview from "./Components/Overview";
import Timeline from "./Components/Timeline";

const App = () => {
  return (
    <div className='App'>
      <Navbar />

      <Switch>
        <Route exact path='/' component={AddExpense} />
        <Route exact path='/activity' component={Activity} />
        <Route exact path='/expense' component={EditExpense} />
        <Route exact path='/overview' component={Overview} />
        <Route exact path='/timeline' component={Timeline} />
      </Switch>
    </div>
  );
};

export default App;
