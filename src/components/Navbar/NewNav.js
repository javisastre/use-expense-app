import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    top: 0,
    left: 0,
    position: "fixed",
    zIndex: 1,
    width: "100vw",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar({ parentBalance }) {
  const classes = useStyles();
  const [display, setDisplay] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar
          onClick={() => {
            setDisplay(!display);
          }}
        >
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Current balance: {parentBalance} €
          </Typography>
        </Toolbar>
      </AppBar>
      {display ? <Menu setDisplay={setDisplay} display={display} /> : null}
    </div>
  );
}
