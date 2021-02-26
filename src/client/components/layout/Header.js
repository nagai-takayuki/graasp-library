import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { AccountCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../common/Logo';
import { HOME_ROUTE } from '../../config/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  link: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#fff',
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
      <AppBar position="absolute">
        <Toolbar>
          <a href={HOME_ROUTE} className={classes.link}>
            <Logo className={classes.logo} />
            <Typography variant="h6" color="inherit">
              {t('Explore')}
            </Typography>
          </a>
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
