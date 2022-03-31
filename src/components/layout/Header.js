import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import {
  ALL_COLLECTIONS_ROUTE,
  HOME_ROUTE,
  MY_LIST_ROUTE,
} from '../../config/routes';
import UserHeader from './UserHeader';
import { APP_NAME } from '../../config/constants';
import {
  HEADER_ALL_COLLECTIONS_ID,
  HEADER_GRAASP_EXPLORER_ID,
  HEADER_MY_LIST_ID,
} from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import {
  HEADER_HEIGHT,
  HEADER_LOGO_HEIGHT,
  HEADER_SHADOW_EFFECT,
} from '../../config/cssStyles';

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
  toolbar: {
    height: HEADER_HEIGHT,
  },
  header: {
    boxShadow: HEADER_SHADOW_EFFECT,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
  logo: {
    fill: '#000',
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
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
  const { hooks } = useContext(QueryClientContext);
  const { data: currentMember, isError } = hooks.useCurrentMember();

  const renderMyList = () => {
    if (isError || !currentMember || currentMember.isEmpty()) {
      return null;
    }

    return (
      <Link href={MY_LIST_ROUTE} className={classes.link}>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.title}
          id={HEADER_MY_LIST_ID}
        >
          {t('My Lists')}
        </Typography>
      </Link>
    );
  };

  return (
    <>
      <header className={classes.header}>
        <AppBar position="fixed" color="#ffffff">
          <Toolbar className={classes.toolbar}>
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
                  id={HEADER_GRAASP_EXPLORER_ID}
                >
                  {t(APP_NAME)}
                </Typography>
              </Link>
              <Link href={ALL_COLLECTIONS_ROUTE} className={classes.link}>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.title}
                  id={HEADER_ALL_COLLECTIONS_ID}
                >
                  {t('All Collections')}
                </Typography>
              </Link>
              {renderMyList()}
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
