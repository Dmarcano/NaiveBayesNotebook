import Link from 'next/link'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


const linkStyle = {
    marginRight : 15
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      color:  'blue',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },

    navBar : {
        color : 'blue'
    },
  }));
  


const Header = () => { 
    const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Simply Complex - Probability Final Project
          </Typography>
         
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Header;