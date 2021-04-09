import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import AddExpense from "./components/AddExpense";
import Activity from "./components/Activity";
import EditExpense from "./components/EditExpense";
import Overview from "./components/Overview";
import Timeline from "./components/Timeline";

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route exact path='/' component={AddExpense} />
        <Route exact path='/activity' component={Activity} />
        <Route exact path='/expense/:id' component={EditExpense} />
        <Route exact path='/overview' component={Overview} />
        <Route exact path='/timeline' component={Timeline} />
      </Switch>
    </div>
  );
};

export default App;
