import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { HOME_ROUTE } from '../../config/routes';
import UserHeader from './UserHeader';
import {
  APP_NAME,
  HEADER_HEIGHT,
  HEADER_LOGO_HEIGHT,
} from '../../config/constants';

const GraaspLogo = dynamic(
  () => import('@graasp/ui').then((mod) => mod.GraaspLogo),
  { ssr: false },
);

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
    fill: '#fff',
  },
  title: {
    marginLeft: theme.spacing(2),
    '&:hover': {
      cursor: 'pointer',
    },
  },
  spacing: {
    height: HEADER_HEIGHT,
  },
}));

function Header() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <header>
        <AppBar position="absolute">
          <Toolbar>
            <div className={classes.headerLeft}>
              <GraaspLogo
                height={HEADER_LOGO_HEIGHT}
                className={classes.logo}
              />
              <Link href={HOME_ROUTE} className={classes.link}>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.title}
                >
                  {t(APP_NAME)}
                </Typography>
              </Link>
            </div>
            <UserHeader />
          </Toolbar>
        </AppBar>
      </header>
      <div className={classes.spacing} />
    </>
  );
}

export default Header;
