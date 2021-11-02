import React, { useState } from 'react';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import ListItem from '@material-ui/core/ListItem';
import PollIcon from '@material-ui/icons/Poll';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@material-ui/icons/Delete';
import { useLocation, useHistory } from 'react-router';
import List from '@material-ui/core/List';
import FavoriteIcon from '@material-ui/icons/Favorite';

export const HOME_PATH = '/';
export const SHARED_ITEMS_PATH = '/shared';
export const FAVORITE_ITEMS_PATH = '/favorite';
export const RECYCLE_BIN_PATH = '/recycle-bin';

const MainMenu = () => {
  const { t } = useTranslation();
  const [dense] = useState(true);
  const { push } = useHistory();
  const { pathname } = useLocation();

  const goTo = (path) => {
    push(path);
  };

  const renderAuthenticatedMemberMenuItems = () => {
    return (
      <>
        <ListItem
          button
          onClick={() => goTo(HOME_PATH)}
          selected={pathname === HOME_PATH}
        >
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>

          <ListItemText primary={t('Pre-School')} />
        </ListItem>
        <ListItem
          button
          onClick={() => goTo(SHARED_ITEMS_PATH)}
          selected={pathname === SHARED_ITEMS_PATH}
        >
          <ListItemIcon>
            <FolderSharedIcon />
          </ListItemIcon>
          <ListItemText primary={t('Grade 1-8')} />
        </ListItem>
        <ListItem
          button
          onClick={() => goTo(FAVORITE_ITEMS_PATH)}
          selected={pathname === FAVORITE_ITEMS_PATH}
        >
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary={t('High School')} />
        </ListItem>
        <ListItem
          button
          onClick={() => goTo(RECYCLE_BIN_PATH)}
          selected={pathname === RECYCLE_BIN_PATH}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary={t('College')} />
        </ListItem>
      </>
    );
  };

  return <List dense={dense}>{renderAuthenticatedMemberMenuItems()}</List>;
};

export default MainMenu;
