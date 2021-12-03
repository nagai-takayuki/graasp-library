import { makeStyles, Button } from '@material-ui/core';
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {
  COLLEGE_TITLE,
  GRAASP_BUILDER_URL,
  GRADE_1_TO_8_TITLE,
  HIGH_SCHOOL_TITLE,
  LEFT_MENU_WIDTH,
  POST_GRAD_TITLE,
  PRE_SCHOOL_TITLE,
  TEST_PREP_TITLE,
} from '../../config/constants';
import {
  ALL_COLLECTION_ROUTE,
  COLLEGE_ROUTE,
  GRADE_1_TO_8_ROUTE,
  HIGH_SCHOOL_ROUTE,
  PRE_SCHOOL_ROUTE,
} from '../../config/routes';

const useStyles = makeStyles((theme) => ({
  list: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
  },
  button: {
    marginTop: theme.spacing(5),
    width: LEFT_MENU_WIDTH,
  },
}));

function SideMenu() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <List className={classes.list}>
        {[
          { name: 'All', route: ALL_COLLECTION_ROUTE },
          { name: PRE_SCHOOL_TITLE, route: PRE_SCHOOL_ROUTE },
          { name: GRADE_1_TO_8_TITLE, route: GRADE_1_TO_8_ROUTE },
          { name: HIGH_SCHOOL_TITLE, route: HIGH_SCHOOL_ROUTE },
          { name: COLLEGE_TITLE, route: COLLEGE_ROUTE },
        ].map((entry) => (
          <Link href={entry.route} className={classes.link}>
            <ListItem button key={t(entry.name)}>
              <ListItemIcon>
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText primary={t(entry.name)} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List className={classes.list}>
        {[TEST_PREP_TITLE, POST_GRAD_TITLE].map((text) => (
          <ListItem button key={t(text)} disabled>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <a href={GRAASP_BUILDER_URL}>
        <Button variant="contained" className={classes.button}>
          {t('Create Your Own')}
        </Button>
      </a>
    </>
  );
}

export default SideMenu;
