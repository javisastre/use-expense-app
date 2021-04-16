import React, { useState, useEffect } from "react";
import { VictoryPie } from "victory";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Selector from "./Selector";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  title: {
    marginTop: "4vh",
    fontWeight: "600",
    textAlign: "center",
  },
  salary: {
    backgroundColor: "#14B0F3",
    color: "white",
    marginTop: "2vh",
    textAlign: "center",
    width: "80vw",
  },
  bar: {
    backgroundColor: "#0066DD",
    color: "white",
    marginTop: "2vh",
    textAlign: "center",
    width: "80vw",
  },
  restaurant: {
    backgroundColor: "#01AC83",
    color: "white",
    marginTop: "2vh",
    textAlign: "center",
    width: "80vw",
  },
  grocery: {
    backgroundColor: "#DF0086",
    color: "white",
    marginTop: "2vh",
    textAlign: "center",
    width: "80vw",
  },
  transport: {
    backgroundColor: "#E7A600",
    color: "white",
    marginTop: "2vh",
    textAlign: "center",
    width: "80vw",
  },
  centerAll: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Overview = ({ activities }) => {
  const [values, setValues] = useState({
    bar: 1,
    restaurant: 2,
    grocery: 3,
    transport: 4,
  });
  const [currentMonth, setCurrentMonth] = useState(0);
  const [monthList, setMonthList] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const monthArr = [];
    activities.forEach((activity) => {
      let month = new Date(activity.created_at).getMonth();
      if (!monthArr.includes(month)) {
        monthArr.push(month);
      }
    });
    setMonthList(monthArr.sort((a, b) => a - b));
    setCurrentMonth(Math.max(...monthArr));

    const monthActivities = activities.filter((activity) => {
      return new Date(activity.created_at).getMonth() === currentMonth;
    });

    let [newBar, newRestaurant, newGrocery, newTransport, newSalary] = [
      0,
      0,
      0,
      0,
      0,
    ];

    monthActivities.forEach((act) => {
      if (act.category === "Bar/Cafeteria") {
        newBar += act.amount;
      } else if (act.category === "Restaurant") {
        newRestaurant += act.amount;
      } else if (act.category === "Grocery Store") {
        newGrocery += act.amount;
      } else if (act.category === "Transport") {
        newTransport += act.amount;
      } else if (act.category === "Salary") {
        newSalary += act.amount;
      }
    });

    setValues({
      bar: newBar,
      restaurant: newRestaurant,
      grocery: newGrocery,
      transport: newTransport,
      salary: newSalary,
    });
  }, [currentMonth, activities]);

  return (
    <div className={classes.centerAll}>
      <Selector
        monthList={monthList}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <Typography variant='h5' className={classes.title}>
        Current Month Income
      </Typography>
      <Typography variant='h5' className={classes.salary}>
        Salary: {values.salary}
      </Typography>
      <Typography variant='h5' className={classes.title}>
        Current Month Expenses
      </Typography>

      <VictoryPie
        animate={{ duration: 500 }}
        colorScale={["#0066DD", "#01AC83", "#DF0086", "#E7A600"]}
        data={[
          { x: "Bar", y: values.bar },
          { x: "Restaurant", y: values.restaurant },
          { x: "Grocery Store", y: values.grocery },
          { x: "Transport", y: values.transport },
        ]}
      />
      <Typography variant='h5' className={classes.bar}>
        Bar/Cafeteria: {values.bar}
      </Typography>
      <Typography variant='h5' className={classes.restaurant}>
        Restaurant: {values.restaurant}
      </Typography>
      <Typography variant='h5' className={classes.grocery}>
        Grocery Store: {values.grocery}
      </Typography>
      <Typography variant='h5' className={classes.transport}>
        Transport: {values.transport}
      </Typography>
    </div>
  );
};

export default Overview;
