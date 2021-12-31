import {
  makeStyles,
  IconButton,
  Divider,
  Button,
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Seo from '../common/Seo';
import {
  APP_AUTHOR,
  APP_DESCRIPTION,
  APP_NAME,
  LEFT_MENU_WIDTH,
  GRAASP_BUILDER_URL,
  LEVEL,
  DISCIPLINE,
} from '../../config/constants';
import CollectionsGrid from '../collection/CollectionsGrid';
import { QueryClientContext } from '../QueryClientContext';
import { PUBLISHED_TAG_ID } from '../../config/env';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';
import { compare } from '../../utils/helpers';
import LevelCollectionsPage from './LevelCollectionsPage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: LEFT_MENU_WIDTH,
    flexShrink: 0,
    zIndex: theme.zIndex.appBar - 2,
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
    width: '100%',
    zIndex: theme.zIndex.appBar - 2,
  },
  toolbar: theme.mixins.toolbar,
  iconButton: {
    padding: theme.spacing(1),
  },
  typographyMargin: {
    margin: theme.spacing(1.5, 0),
  },
  list: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
  },
  sectionHeader: {
    marginTop: theme.spacing(2),
  },
}));

function AllCollections() {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const { hooks } = useContext(QueryClientContext);
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag(
    PUBLISHED_TAG_ID,
    {
      placeholderData: PLACEHOLDER_COLLECTIONS,
    },
  );

  // get categories in each type
  const { data: categoryTypes } = hooks.useCategoryTypes();
  const { data: categories } = hooks.useCategories();
  const allCategories = categories?.groupBy((entry) => entry.type);
  const levelList = allCategories?.get(
    categoryTypes?.find((type) => type.name === LEVEL)?.id,
  );
  const disciplineList = allCategories
    ?.get(categoryTypes?.find((type) => type.name === DISCIPLINE)?.id)
    ?.sort(compare);

  // state variable to record selected options
  const [selectedOptions, setSelectedOptions] = useState([null, null]);

  // state variable to control the side menu
  const [sideBarStatus, setSideBarStatus] = useState(true);

  const closeSideBar = () => {
    setSideBarStatus(false);
  };
  const openSideBar = () => {
    setSideBarStatus(true);
  };

  const clearSelection = (type) => () => {
    if (type === LEVEL) setSelectedOptions([null, selectedOptions[1]]);
    if (type === DISCIPLINE) setSelectedOptions([selectedOptions[0], null]);
  };

  const handleClick = (type, name) => () => {
    if (type === LEVEL) setSelectedOptions([name, selectedOptions[1]]);
    if (type === DISCIPLINE) setSelectedOptions([selectedOptions[0], name]);
  };

  const checkSelected = (type, name) => {
    if (type === LEVEL) return name === selectedOptions[0];
    if (type === DISCIPLINE) return name === selectedOptions[1];
    return false;
  };

  const redirectToCompose = () => {
    window.location.href = GRAASP_BUILDER_URL;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
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
          <Typography variant="h5" align="center">
            {t('Categories')}
          </Typography>
          <IconButton onClick={closeSideBar}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<BookmarkIcon />}
          onClick={clearSelection()}
        >
          {t('All Collections')}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={redirectToCompose}
        >
          {t('Create Your Own')}
        </Button>
        <Typography
          variant="subtitle1"
          align="center"
          color="primary"
          className={classes.sectionHeader}
        >
          {t('Education Level')}
        </Typography>
        <List dense className={classes.list}>
          {levelList?.map((entry) => (
            <ListItem
              button
              key={entry.name}
              onClick={handleClick(LEVEL, entry.name)}
              selected={checkSelected(LEVEL, entry.name)}
            >
              <ListItemText primary={t(entry.name)} />
            </ListItem>
          ))}
        </List>
        <Button
          variant="text"
          color="default"
          size="small"
          startIcon={<HighlightOffIcon />}
          onClick={clearSelection(LEVEL)}
        >
          {t('Clear Selection')}
        </Button>
        <Divider />
        <Typography
          variant="subtitle1"
          align="center"
          color="primary"
          className={classes.sectionHeader}
        >
          {t('Discipline')}
        </Typography>
        <List dense className={classes.list}>
          {disciplineList?.map((entry) => (
            <ListItem
              button
              key={entry.name}
              onClick={handleClick(DISCIPLINE, entry.name)}
              selected={checkSelected(DISCIPLINE, entry.name)}
            >
              <ListItemText primary={t(entry.name)} />
            </ListItem>
          ))}
        </List>
        <Button
          variant="text"
          color="default"
          size="small"
          startIcon={<HighlightOffIcon />}
          onClick={clearSelection(DISCIPLINE)}
        >
          {t('Clear Selection')}
        </Button>
        <Divider className={classes.divider} />
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
            onClick={openSideBar}
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
          {!selectedOptions[0] && !selectedOptions[1] && (
            <>
              <Typography variant="h3" align="center">
                {t(`All Collections`)}
              </Typography>
              <Typography variant="subtitle2" aligh="left">
                {t('collectionsCount', { count: collections?.size })}
              </Typography>
              <CollectionsGrid
                collections={collections}
                isLoading={isLoading}
              />
            </>
          )}
          {(selectedOptions[0] || selectedOptions[1]) && (
            <LevelCollectionsPage selectedOptions={selectedOptions} />
          )}
        </main>
      </div>
    </div>
  );
}

export default AllCollections;
