import React from "react";

import Drawer from "./Drawer";

import { AppBar, Toolbar, IconButton, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "sticky",
    top: 0,
    left: 0,
    zIndex: 1,
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

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
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
    </div>
  );
}
