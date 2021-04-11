import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import expenseService from "../services/expenseservices";
import Moment from "react-moment";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Activity = ({ update, setUpdate }) => {
  const [activities, setActivities] = useState([]);

  const getAllActivities = async () => {
    try {
      const allActivities = await expenseService.getAllExpenses();
      setActivities(allActivities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(getAllActivities, []);

  const handleDelete = async (id) => {
    try {
      await expenseService.deleteExpense(id);
    } catch (error) {
      console.log(error);
    }
    setUpdate(!update);
    getAllActivities();
  };

  return (
    <div>
      {activities.map((act) => {
        return (
          <article key={act._id}>
            <p>{act.amount}</p>
            <p>{act.category}</p>
            <Moment format='DD/MM/YYYY @ hh:mm'>{act.created_at}</Moment>
            <Link to={`/expense/${act._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(act._id)}>Delete</button>
          </article>
        );
      })}
      <Link to='/addexpense'>
        <Fab size='medium' color='primary' aria-label='add'>
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
};

export default Activity;
