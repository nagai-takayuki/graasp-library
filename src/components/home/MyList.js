import { makeStyles, Typography, Tab, AppBar, Tabs } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PublishIcon from '@material-ui/icons/Publish';
import CollectionsGrid from '../collection/CollectionsGrid';
import { QueryClientContext } from '../QueryClientContext';
import { PUBLISHED_TAG_ID } from '../../config/env';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';
import {
  TITLE_TEXT_ID,
  buildMyListNavigationTabId,
} from '../../config/selectors';
import TabPanel from './TabPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  tabBar: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

function MyList() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag(
    PUBLISHED_TAG_ID,
    {
      placeholderData: PLACEHOLDER_COLLECTIONS,
    },
  );
  const { data: likedItems } = hooks.useLikedItems(member?.get('id'));

  const favoriteItemsList = member?.get('extra')?.favoriteItems || [];
  const favoriteCollections = collections?.filter((collection) =>
    favoriteItemsList?.includes(collection?.id),
  );
  const likedItemsList = likedItems?.map((entry) => entry.itemId);
  const likedCollections = collections?.filter((collection) =>
    likedItemsList?.includes(collection?.id),
  );

  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Typography variant="h3" align="center" id={TITLE_TEXT_ID}>
          {t('My Collections')}
        </Typography>
        <AppBar position="static" color="default" className={classes.tabBar}>
          <Tabs
            value={tab}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="navigation tabs"
          >
            <Tab
              label={t('My Favorites')}
              icon={<StarBorderIcon />}
              id={buildMyListNavigationTabId(0)}
            />
            <Tab
              label={t('My Likes')}
              icon={<FavoriteBorderIcon />}
              id={buildMyListNavigationTabId(1)}
            />
            <Tab
              label={t('My Publishments')}
              icon={<PublishIcon />}
              id={buildMyListNavigationTabId(2)}
              disabled
            />
          </Tabs>
        </AppBar>
        <TabPanel value={tab} index={0}>
          <CollectionsGrid
            collections={favoriteCollections}
            isLoading={isLoading}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <CollectionsGrid
            collections={likedCollections}
            isLoading={isLoading}
          />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <CollectionsGrid collections={collections} isLoading={isLoading} />
        </TabPanel>
      </main>
    </div>
  );
}

export default MyList;
