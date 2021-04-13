import React from "react";
import { Link } from "react-router-dom";
import expenseService from "../services/expenseservices";
import DayJS from "react-dayjs";

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
    right: "43vw",
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
    width: "98px",
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: "2px",
  },
  restaurant: {
    backgroundColor: "#01AC83",
    color: "white",
    width: "79px",
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: "2px",
  },
  grocery: {
    backgroundColor: "#DF0086",
    color: "white",
    width: "101px",
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: "2px",
  },
  transport: {
    backgroundColor: "#E7A600",
    color: "white",
    width: "72px",
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: "2px",
  },
  salary: {
    backgroundColor: "#14B0F3",
    color: "white",
    width: "45px",
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: "2px",
  },
}));

const Activity = ({ update, setUpdate, activities }) => {
  const classes = useStyles();

  const handleDelete = async (id) => {
    try {
      await expenseService.deleteExpense(id);
    } catch (error) {
      console.log(error);
    }
    setUpdate(!update);
  };

  const categorySelector = (cat) => {
    switch (cat) {
      case "Salary":
        return classes.salary;
      case "Bar/Cafeteria":
        return classes.bar;
      case "Grocery Store":
        return classes.grocery;
      case "Restaurant":
        return classes.restaurant;
      case "Transport":
        return classes.transport;
      default:
        return classes.root;
    }
  };

  return (
    <div>
      {activities.map((act) => {
        return (
          <Card className={classes.root} key={act._id}>
            <CardContent>
              {act.category === "Salary" ? (
                <Typography variant='h5'>{act.amount} € </Typography>
              ) : (
                <Typography variant='h5' className={classes.expense}>
                  - {act.amount} €{" "}
                </Typography>
              )}
              <Typography className={categorySelector(act.category)}>
                {act.category}
              </Typography>
              <Typography variant='overline' display='block'>
                <DayJS format='DD/MM/YYYY @ hh:mm'>{act.created_at}</DayJS>
              </Typography>
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
