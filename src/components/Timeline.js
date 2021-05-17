import React, { useState, useEffect } from "react";

import { VictoryChart, VictoryGroup, VictoryBar } from "victory";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
  income: {
    backgroundColor: "#01AC83",
    color: "white",
    marginTop: "2vh",
    paddingTop: "2vh",
    paddingBottom: "2vh",
    textAlign: "center",
    width: "80vw",
  },
  expense: {
    backgroundColor: "#ff340f",
    color: "white",
    marginTop: "2vh",
    paddingTop: "2vh",
    paddingBottom: "2vh",
    textAlign: "center",
    width: "80vw",
  },
  centerAll: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Timeline = ({ activities, monthList, monthConverter }) => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const setValues = () => {
      const reverseMonthList = monthList.sort((a, b) => a - b);
      const inc = reverseMonthList.map((mo) => {
        let obj = {
          x: monthConverter(mo),
          y: 0,
        };
        return obj;
      });
      const exp = reverseMonthList.map((mo) => {
        let obj = {
          x: monthConverter(mo),
          y: 0,
        };
        return obj;
      });

      activities.forEach((element) => {
        const monthNumber = new Date(element.created_at).getMonth();
        if (element.isIncome) {
          exp[monthNumber].y += element.amount;
        } else {
          inc[monthNumber].y += element.amount;
        }
      });
      setIncomeData(inc);
      setExpenseData(exp);
    };
    setValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.centerAll}>
      <Typography variant='h5' className={classes.title}>
        All time expenses & incomes
      </Typography>
      <VictoryChart domainPadding={50}>
        <VictoryGroup
          height={3200}
          offset={24}
          colorScale={["#ff340f", "#01AC83"]}
          animate={{
            duration: 500,
            onLoad: { duration: 100 },
          }}
        >
          <VictoryBar data={incomeData} />
          <VictoryBar data={expenseData} />
        </VictoryGroup>
      </VictoryChart>
      <Typography variant='h6' className={classes.expense}>
        Total expenses:{" "}
        {incomeData.map((elem) => {
          return (
            <Typography variant='overline' display='block'>
              {elem.x}: {elem.y}
            </Typography>
          );
        })}
      </Typography>

      <Typography variant='h6' className={classes.income}>
        Total incomes:{" "}
        {expenseData.map((elem) => {
          return (
            <Typography variant='overline' display='block'>
              {elem.x}: {elem.y}
            </Typography>
          );
        })}
      </Typography>
    </div>
  );
};

export default Timeline;
