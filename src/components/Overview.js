import React, { useState, useEffect } from "react";
import { VictoryPie } from "victory";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
  },
}));

const Overview = ({ activities }) => {
  const [bar, setBar] = useState(1);
  const [restaurant, setRestaurant] = useState(1);
  const [grocery, setGrocery] = useState(1);
  const [transport, setTransport] = useState(1);
  const [salary, setSalary] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(3);

  const classes = useStyles();

  useEffect(() => {
    const monthActivities = activities.filter((activity) => {
      return new Date(activity.created_at).getMonth() === currentMonth;
    });

    monthActivities.forEach((act) => {
      switch (act.category) {
        case "Bar/Cafeteria":
          let newBar = bar + act.amount;
          setBar(newBar);
          break;
        case "Restaurant":
          setRestaurant(restaurant + act.amount);
          break;
        case "Grocery Store":
          setGrocery(grocery + act.amount);
          break;
        case "Transport":
          setTransport(transport + act.amount);
          break;
        case "Salary":
          setSalary(salary + act.amount);
        default:
          break;
      }
    });

    console.log("activities", activities);
    console.log("monthActivities", monthActivities);
  }, [currentMonth]);

  return (
    <div>
      <Typography variant='h5' className={classes.title}>
        Current Month Expenses
      </Typography>

      <VictoryPie
        animate={{ duration: 500 }}
        colorScale={["#0066DD", "#01AC83", "#DF0086", "#E7A600"]}
        data={[
          { x: `Bar/Cafeteria: ${bar}`, y: bar },
          { x: `Restaurant: ${restaurant}`, y: restaurant },
          { x: `Grocery Store: ${grocery}`, y: grocery },
          { x: `Transport: ${transport}`, y: transport },
        ]}
      />
      <Typography variant='h5' className={classes.title}>
        Current Month Income
      </Typography>
      <Typography variant='h5' className={classes.salary}>
        {salary}
      </Typography>
    </div>
  );
};

export default Overview;
