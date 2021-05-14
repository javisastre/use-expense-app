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

export default function Selector({
  monthList,
  currentMonth,
  setCurrentMonth,
  monthConverter,
}) {
  const classes = useStyles();

  const handleChange = (event) => {
    setCurrentMonth(event.target.value);
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
