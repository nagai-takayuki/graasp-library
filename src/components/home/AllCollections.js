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
import Skeleton from '@material-ui/lab/Skeleton';
import Seo from '../common/Seo';
import {
  APP_AUTHOR,
  APP_DESCRIPTION,
  APP_NAME,
  LEFT_MENU_WIDTH,
  GRAASP_BUILDER_URL,
  LEVEL,
  DISCIPLINE,
  ALL,
} from '../../config/constants';
import CollectionsGrid from '../collection/CollectionsGrid';
import { QueryClientContext } from '../QueryClientContext';
import { PUBLISHED_TAG_ID } from '../../config/env';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';
import { compare } from '../../utils/helpers';
import LevelCollectionsPage from './LevelCollectionsPage';
import {
  buildEducationLevelOptionId,
  CLEAR_EDUCATION_LEVEL_SELECTION_ID,
  CLOSE_MENU_BUTTON_ID,
  OPEN_MENU_BUTTON_ID,
  SIDEMENU_HEADING_ID,
  SUBTITLE_TEXT_ID,
  TITLE_TEXT_ID,
} from '../../config/selectors';

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
  divider: {
    marginBottom: theme.spacing(10),
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
  const { data: categories, isLoading: isCategoriesLoading } =
    hooks.useCategories();
  const allCategories = categories?.groupBy((entry) => entry.type);
  const levelList = allCategories?.get(
    categoryTypes?.find((type) => type.name === LEVEL)?.id,
  );
  const disciplineList = allCategories
    ?.get(categoryTypes?.find((type) => type.name === DISCIPLINE)?.id)
    ?.sort(compare);

  // state variable to record selected options
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState([]);

  // state variable to control the side menu
  const [sideBarStatus, setSideBarStatus] = useState(true);

  const closeSideBar = () => {
    setSideBarStatus(false);
  };
  const openSideBar = () => {
    setSideBarStatus(true);
  };

  const clearSelection = (type) => () => {
    if (type === LEVEL) setSelectedLevel([]);
    if (type === DISCIPLINE) setSelectedDiscipline([]);
    if (type === ALL) {
      setSelectedLevel([]);
      setSelectedDiscipline([]);
    }
  };

  const handleClick = (type, name) => () => {
    if (type === LEVEL) {
      const currentIndex = selectedLevel.indexOf(name);
      const newChecked = [...selectedLevel];

      if (currentIndex === -1) {
        newChecked.push(name);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setSelectedLevel(newChecked);
    }
    if (type === DISCIPLINE) {
      const currentIndex = selectedDiscipline.indexOf(name);
      const newChecked = [...selectedDiscipline];

      if (currentIndex === -1) {
        newChecked.push(name);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setSelectedDiscipline(newChecked);
    }
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
          <Typography variant="h5" align="center" id={SIDEMENU_HEADING_ID}>
            {t('Categories')}
          </Typography>
          <IconButton onClick={closeSideBar} id={CLOSE_MENU_BUTTON_ID}>
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
          onClick={clearSelection(ALL)}
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
        {isCategoriesLoading ? (
          <Skeleton height="10%" />
        ) : (
          <List dense className={classes.list}>
            {levelList?.map((entry, index) => (
              <ListItem
                button
                key={entry.id}
                onClick={handleClick(LEVEL, entry.id)}
                selected={selectedLevel.indexOf(entry.id) !== -1}
                id={buildEducationLevelOptionId(index)}
              >
                <ListItemText primary={t(entry.name)} />
              </ListItem>
            ))}
          </List>
        )}
        <Button
          variant="text"
          color="default"
          size="small"
          startIcon={<HighlightOffIcon />}
          onClick={clearSelection(LEVEL)}
          id={CLEAR_EDUCATION_LEVEL_SELECTION_ID}
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
        {isCategoriesLoading ? (
          <Skeleton height="10%" />
        ) : (
          <List dense className={classes.list}>
            {disciplineList?.map((entry) => (
              <ListItem
                button
                key={entry.id}
                onClick={handleClick(DISCIPLINE, entry.id)}
                selected={selectedDiscipline.indexOf(entry.id) !== -1}
              >
                <ListItemText primary={t(entry.name)} />
              </ListItem>
            ))}
          </List>
        )}
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
            id={OPEN_MENU_BUTTON_ID}
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
          {selectedLevel?.length === 0 && selectedDiscipline?.length === 0 && (
            <>
              <Typography variant="h3" align="center" id={TITLE_TEXT_ID}>
                {t(`All Collections`)}
              </Typography>
              <Typography
                variant="subtitle2"
                aligh="left"
                id={SUBTITLE_TEXT_ID}
              >
                {t('collectionsCount', { count: collections?.size })}
              </Typography>
              <CollectionsGrid
                collections={collections}
                isLoading={isLoading}
              />
            </>
          )}
          {(selectedLevel?.length > 0 || selectedDiscipline?.length > 0) && (
            <LevelCollectionsPage
              selectedLevel={selectedLevel}
              selectedDiscipline={selectedDiscipline}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default AllCollections;
