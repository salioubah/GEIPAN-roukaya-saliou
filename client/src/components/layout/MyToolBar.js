import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button, Grid } from '@material-ui/core';

import {useSrefActive} from "@uirouter/react";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MyToolBar() {
  const classes = useStyles();
    const homeSref = useSrefActive("home", null, null);
    const  statsSref = useSrefActive("stats", null, null);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            GEIPAN
          </Typography>
          <Grid container justify="center" spacing={2}>
            <Button color="inherit" {...homeSref} ><strong>Home</strong></Button>
            <Button color="inherit" {...statsSref} ><strong>Statistiques</strong></Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}