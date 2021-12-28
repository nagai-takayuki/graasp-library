import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(() => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  content: {
    // fix: typography is strong on first render
    '& strong': {
      fontWeight: 400,
    },
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="subtitle1" className={classes.content}>
            &copy;
            {`${new Date().getFullYear()} Graasp Association`}
          </Typography>
        </Toolbar>
      </AppBar>
    </footer>
  );
}

export default Footer;
