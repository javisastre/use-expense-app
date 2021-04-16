import React, {useState, useEffect} from "react";
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

export default function Selector({ setCurrentMonth }) {
  const classes = useStyles();

  const [selector, setSelector] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    setSelector(event.target.name);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='age-native-simple'>Month</InputLabel>
        <Select native value={selector} onChange={handleChange}>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
    </div>
  );
}
