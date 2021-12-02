import { makeStyles, IconButton, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useTheme } from '@material-ui/core/styles';
import Seo from '../common/Seo';
import {
  APP_AUTHOR,
  APP_DESCRIPTION,
  APP_NAME,
  LEFT_MENU_WIDTH,
} from '../../config/constants';
import CollectionsGrid from '../collection/CollectionsGrid';
import { QueryClientContext } from '../QueryClientContext';
import { PUBLISHED_TAG_ID } from '../../config/env';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import SideMenu from '../layout/SideMenu';

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
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: theme.spacing(5) - LEFT_MENU_WIDTH,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.spacing(5),
  },
  mainWrapper: {
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(6),
  },
  toolbar: theme.mixins.toolbar,
  iconButton: {
    padding: theme.spacing(1),
  },
  typographyMargin: {
    margin: theme.spacing(1.5, 0),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
}));

function PreSchool() {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const { hooks } = useContext(QueryClientContext);
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag(
    PUBLISHED_TAG_ID,
    {
      placeholderData: PLACEHOLDER_COLLECTIONS,
      withMemberships: true,
    },
  );

  // get all categories
  const { data: allCategories } = hooks.useCategories();

  // get category map (to map between category id and name)
  const categoriesMap = new Map(
    allCategories?.map((entry) => [entry.name, entry.id]),
  );

  // get itemIds belong to each category
  const ageGroupId = categoriesMap?.get('pre-school');
  const { data: collectionsIds } = hooks.useItemsInCategories([ageGroupId]);
  const collectionsAll = collections?.filter((collection) =>
    collectionsIds
      ?.map((entry) => entry.itemId)
      .toArray()
      .includes(collection.id),
  );
  const { data: mathIds } = hooks.useItemsInCategories([
    categoriesMap?.get('math'),
    ageGroupId,
  ]);
  const collectionsMath = collections?.filter((collection) =>
    mathIds
      ?.map((entry) => entry.itemId)
      .toArray()
      .includes(collection.id),
  );

  const { data: litIds } = hooks.useItemsInCategories([
    categoriesMap?.get('literature'),
    ageGroupId,
  ]);
  const collectionsLiterature = collections?.filter((collection) =>
    litIds
      ?.map((entry) => entry.itemId)
      .toArray()
      ?.includes(collection.id),
  );

  const { data: nsIds } = hooks.useItemsInCategories([
    categoriesMap?.get('natural-science'),
    ageGroupId,
  ]);
  const collectionsNaturalScience = collections?.filter((collection) =>
    nsIds
      ?.map((entry) => entry.item_id)
      .toArray()
      ?.includes(collection.id),
  );

  const { data: ssIds } = hooks.useItemsInCategories([
    categoriesMap?.get('social-science'),
    ageGroupId,
  ]);
  const collectionsSocialScience = collections?.filter((collection) =>
    ssIds
      ?.map((entry) => entry.itemId)
      .toArray()
      .includes(collection.id),
  );

  const { data: langIds } = hooks.useItemsInCategories([
    categoriesMap?.get('language'),
    ageGroupId,
  ]);
  const collectionsLanguage = collections?.filter((collection) =>
    langIds
      ?.map((entry) => entry.itemId)
      .toArray()
      .includes(collection.id),
  );

  const { data: artIds } = hooks.useItemsInCategories([
    categoriesMap?.get('art'),
    ageGroupId,
  ]);
  const collectionsArt = collections?.filter((collection) =>
    artIds
      ?.map((entry) => entry.itemId)
      .toArray()
      .includes(collection.id),
  );

  const [sideBarStatus, setSideBarStatus] = React.useState(true);

  const closeSideBar = () => {
    setSideBarStatus(false);
  };
  const OpenSideBar = () => {
    setSideBarStatus(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Header />
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        open={sideBarStatus}
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <div className={classes.drawerHeader}>
          <IconButton onClick={closeSideBar}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <SideMenu />
      </Drawer>
      <div className={classes.mainWrapper}>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: sideBarStatus,
          })}
        >
          <IconButton
            color="primary"
            aria-label="open menu"
            onClick={OpenSideBar}
          >
            <MenuOpenIcon />
          </IconButton>
          <Typography variant="body1" display="inline">
            {t('Open Menu')}
          </Typography>
          <Seo
            title={APP_NAME}
            description={APP_DESCRIPTION}
            author={APP_AUTHOR}
          />
          <Typography variant="h3" align="center">
            {t('Collections for Pre-School')}
          </Typography>
          {[
            { name: 'Math', collections: collectionsMath },
            { name: 'Literature', collections: collectionsLiterature },
            { name: 'Language', collections: collectionsLanguage },
            { name: 'Social Science', collections: collectionsSocialScience },
            { name: 'Natural Science', collections: collectionsNaturalScience },
            { name: 'Arts', collections: collectionsArt },
            { name: 'All', collections: collectionsAll },
          ].map((entry) => (
            <>
              <Typography variant="h3" className={classes.typographyMargin}>
                {t(entry.name)}
              </Typography>
              <CollectionsGrid
                collections={entry.collections}
                isLoading={isLoading}
              />
              <Divider className={classes.divider} />
            </>
          ))}
        </main>
      </div>
      <AppBar position="fixed" color="primary" className={classes.appBarBot}>
        <Footer />
      </AppBar>
    </div>
  );
}

export default PreSchool;
