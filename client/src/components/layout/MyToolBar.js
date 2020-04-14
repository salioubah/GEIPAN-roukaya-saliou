import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button, Grid } from '@material-ui/core';
import { FaHome, FaChartBar } from 'react-icons/fa';
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

          <Grid container  style={{marginLeft:'100px'}}>
            <Button color="inherit" {...homeSref} >
                <strong> <div style={{ fontSize: 15.8 }} ><FaHome/> Home </div> </strong>
            </Button>
            <Button color="inherit" {...statsSref} >
                <strong> <div style={{ fontSize: 15.8 }} ><FaChartBar/>  Statistiques </div> </strong>
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}