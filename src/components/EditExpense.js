import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import expenseService from "./../services/expenseservices";

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  textArea: {
    marginTop: "20vh",
    width: "70vw",
    maergin: "0 auto",
  },
  categorySelector: {
    marginTop: "3vh",
    width: "70vw",
  },
  bar: {
    backgroundColor: "#0066DD",
    color: "white",
    "&:hover": {
      backgroundColor: "#005BC6",
    },
  },
  restaurant: {
    backgroundColor: "#01AC83",
    color: "white",
    "&:hover": {
      backgroundColor: "#009A75",
    },
  },
  grocery: {
    backgroundColor: "#DF0086",
    color: "white",
    "&:hover": {
      backgroundColor: "#C80078",
    },
  },
  transport: {
    backgroundColor: "#E7A600",
    color: "white",
    "&:hover": {
      backgroundColor: "#cf9500",
    },
  },
  salary: {
    backgroundColor: "#14B0F3",
    color: "white",
    "&:hover": {
      backgroundColor: "#129eda",
    },
  },
  submitButton: {
    marginTop: "7vh",
    width: "40vw",
    height: "6vh",
    color: "#ffffff",
    backgroundColor: "#008D39",
    "&:hover": {
      backgroundColor: "#007e33",
    },
  },
  deleteButton: {
    marginTop: "1vh",
    width: "40vw",
    height: "6vh",
    color: "#ffffff",
    backgroundColor: "#CE1B52",
    "&:hover": {
      backgroundColor: "#B91849",
    },
  },
  centerAll: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const EditExpense = ({ update, setUpdate }) => {
  const expenseId = useParams().id;
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [open, setOpen] = React.useState(false);

  const history = useHistory();
  const classes = useStyles();

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
  }, [expenseId]);

  const handleCategory = (event) => setCategory(event.target.value);
  const handleFocus = (event) => event.target.select();
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleInput = (event) => {
    const value = event.target.validity.valid ? event.target.value : amount;
    setAmount(value);
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
    history.push("/");
  };

  const handleDelete = async () => {
    try {
      await expenseService.deleteExpense(expenseId);
    } catch (error) {
      console.log(error);
    }
    setUpdate(!update);
    history.push("/");
  };

  return (
    <div className={classes.centerAll}>
      <form onSubmit={formSubmit} className={classes.centerAll}>
        <FormControl fullWidth className={classes.textArea} variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-amount'>Amount</InputLabel>
          <OutlinedInput
            id='outlined-adornment-amount'
            value={amount}
            onChange={handleInput}
            onClick={handleFocus}
            endAdornment={<InputAdornment position='end'>€</InputAdornment>}
            labelWidth={60}
            type='number'
          />
        </FormControl>
        <FormControl className={classes.categorySelector}>
          <InputLabel id='select-label'>Category</InputLabel>
          <Select
            labelId='select-label'
            id='select'
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={category}
            onChange={handleCategory}
          >
            <ListSubheader>
              <em>Expenses</em>
            </ListSubheader>
            <MenuItem value={"Bar/Cafeteria"} className={classes.bar}>
              Bar/Cafeteria
            </MenuItem>
            <MenuItem value={"Restaurant"} className={classes.restaurant}>
              Restaurant
            </MenuItem>
            <MenuItem value={"Grocery Store"} className={classes.grocery}>
              Grocery Store
            </MenuItem>
            <MenuItem value={"Transport"} className={classes.transport}>
              Transport
            </MenuItem>
            <ListSubheader>
              <em>Income</em>
            </ListSubheader>
            <MenuItem value={"Salary"} className={classes.salary}>
              Salary
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          variant='contained'
          type='submit'
          className={classes.submitButton}
        >
          Edit
        </Button>
      </form>
      <Button
        variant='contained'
        type='submit'
        className={classes.deleteButton}
        onClick={handleDelete}
      >
        Delete
      </Button>
    </div>
  );
};

export default EditExpense;
