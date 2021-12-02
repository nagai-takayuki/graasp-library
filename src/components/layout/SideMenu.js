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
import { GRAASP_BUILDER_URL, LEFT_MENU_WIDTH } from '../../config/constants';
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
          { name: 'Pre-School', route: PRE_SCHOOL_ROUTE },
          { name: 'Grade 1-8', route: GRADE_1_TO_8_ROUTE },
          { name: 'High School', route: HIGH_SCHOOL_ROUTE },
          { name: 'College', route: COLLEGE_ROUTE },
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
        {['Test Prep', 'Post Grad'].map((text) => (
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
