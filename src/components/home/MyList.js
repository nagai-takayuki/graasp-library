import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CollectionsGrid from '../collection/CollectionsGrid';
import { QueryClientContext } from '../QueryClientContext';
import { PUBLISHED_TAG_ID } from '../../config/env';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import {
  LEFT_MENU_WIDTH,
  MY_FAVORITES,
  MY_UPLOADS,
  SAVED_COLLECTIONS,
} from '../../config/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarBot: {
    top: 'auto',
    bottom: 0,
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: LEFT_MENU_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: LEFT_MENU_WIDTH,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  typographyMargin: {
    margin: theme.spacing(1.5, 0),
  },
  link: {
    marginTop: theme.spacing(2),
  },
}));

function MyList() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { hooks } = useContext(QueryClientContext);
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag(
    PUBLISHED_TAG_ID,
    {
      placeholderData: PLACEHOLDER_COLLECTIONS,
    },
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Header />
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List className={classes.link}>
          {[MY_FAVORITES, MY_UPLOADS, SAVED_COLLECTIONS].map((text) => (
            <ListItem button key={t(text)} disabled>
              <ListItemIcon>
                <StarBorderIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Typography variant="h3" align="center">
          {t('My Collections')}
        </Typography>
        <Typography variant="h3" className={classes.typographyMargin}>
          {t('Favorites')}
        </Typography>
        <CollectionsGrid collections={collections} isLoading={isLoading} />
      </main>
      <AppBar position="fixed" color="primary" className={classes.appBarBot}>
        <Footer />
      </AppBar>
    </div>
  );
}

export default MyList;