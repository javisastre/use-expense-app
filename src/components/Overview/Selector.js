import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Selector({ monthList, currentMonth, setCurrentMonth }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setCurrentMonth(event.target.value);
  };

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
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='age-native-simple'>Month</InputLabel>
        <Select native value={currentMonth} onChange={handleChange}>
          {monthList.map((mon) => {
            return (
              <option key={mon} value={mon}>
                {monthConverter(mon)}
              </option>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
