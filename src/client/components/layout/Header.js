import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../common/Logo';
import { HOME_ROUTE } from '../../config/routes';
import UserHeader from './UserHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headerLeft: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  link: {
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
          <div className={classes.headerLeft}>
            <Logo className={classes.logo} />
            <Link to={HOME_ROUTE} className={classes.link}>
              <Typography variant="h6" color="inherit">
                {t('Explore')}
              </Typography>
            </Link>
          </div>
          <UserHeader />
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
