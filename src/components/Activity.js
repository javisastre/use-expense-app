import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import expenseService from "../services/expenseservices";
import Moment from "react-moment";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    marginBottom: "15px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fabGreen: {
    color: "#ffffff",
    backgroundColor: "#008D39",
    "&:hover": {
      backgroundColor: "#007e33",
    },
  },
  fabPosition: {
    position: "fixed",
    zIndex: 1,
    right: "10vw",
    bottom: "10vw",
  },
  title: {
    fontSize: 14,
  },
  expense: {
    color: "#ff0000",
  },
  cardMargin: {
    marginBottom: "5px",
  },
  cardAction: {
    display: "flex",
    flexDirection: "column",
  },
  bar: {
    backgroundColor: "#0066DD",
    color: "white",
  },
  restaurant: {
    backgroundColor: "#01AC83",
    color: "white",
  },
  grocery: {
    backgroundColor: "#DF0086",
    color: "white",
  },
  transport: {
    backgroundColor: "#E7A600",
    color: "white",
  },
  salary: {
    backgroundColor: "#14B0F3",
    color: "white",
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: "2px",
  },
}));

const Activity = ({ update, setUpdate }) => {
  const classes = useStyles();

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
          <Card className={classes.root}>
            <CardContent>
              {act.category === "Salary" ? (
                <Typography variant='h5' component='h2'>
                  {act.amount} €{" "}
                </Typography>
              ) : (
                <Typography
                  variant='h5'
                  component='h2'
                  className={classes.expense}
                >
                  - {act.amount} €{" "}
                </Typography>
              )}
              <Typography className={classes.salary}>{act.category}</Typography>
            </CardContent>
            <CardActions className={classes.cardAction}>
              <Link to={`/expense/${act._id}`}>
                <Button size='small'>Edit</Button>
              </Link>
              <Button size='small' onClick={() => handleDelete(act._id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
          /* <article key={act._id}>
            <p>{act.amount}</p>
            <p>{act.category}</p>
            <Moment format='DD/MM/YYYY @ hh:mm'>{act.created_at}</Moment>
            <Link to={`/expense/${act._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(act._id)}>Delete</button>
          </article> */
        );
      })}
      <Link to='/addexpense' className={classes.fabPosition}>
        <Fab
          size='medium'
          color='primary'
          aria-label='add'
          className={classes.fabGreen}
        >
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
};

export default Activity;
