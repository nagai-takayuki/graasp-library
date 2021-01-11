import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { AccountCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../common/Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    height: '48px',
    marginRight: theme.spacing(2),
  },
}));

function Header() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Logo className={classes.logo} />
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {t('Explore')}
          </Typography>
          <IconButton
            edge="end"
            aria-label="Account"
            aria-haspopup="true"
            onClick={() => {}}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
