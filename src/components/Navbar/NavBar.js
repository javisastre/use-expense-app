import React, { useState } from "react";

import Drawer from "./Drawer";

import { AppBar, Toolbar, IconButton, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
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

const navLinks = [
  { title: `Activity`, path: `/` },
  { title: `New Expense`, path: `/addexpense` },
  { title: `Month Overview`, path: `/overview` },
  { title: `Timeline`, path: `/timeline` },
];

export default function MenuAppBar({ parentBalance }) {
  const classes = useStyles();
  const [display, setDisplay] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={() => {
              setDisplay(!display);
            }}
          >
            <Hidden mdUp>
              <Drawer navLinks={navLinks} />
            </Hidden>
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
