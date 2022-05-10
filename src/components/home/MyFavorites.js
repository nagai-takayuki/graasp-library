import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CollectionsGrid from '../collection/CollectionsGrid';
import { QueryClientContext } from '../QueryClientContext';
import { PUBLISHED_TAG_ID } from '../../config/env';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';
import TabPanel from './TabPanel';
import { MY_FAVORITES_COLLECTIONS_ID } from '../../config/selectors';

function MyFavorites({ tab, index }) {
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag(
    PUBLISHED_TAG_ID,
    {
      placeholderData: PLACEHOLDER_COLLECTIONS,
    },
  );
  const favoriteItemsList = member?.get('extra')?.favoriteItems || [];
  const favoriteCollections = collections?.filter((collection) =>
    favoriteItemsList?.includes(collection?.id),
  );

  return (
    <TabPanel value={tab} index={index}>
      <CollectionsGrid
        id={MY_FAVORITES_COLLECTIONS_ID}
        collections={favoriteCollections}
        isLoading={isLoading}
      />
    </TabPanel>
  );
}

MyFavorites.propTypes = {
  tab: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default MyFavorites;
