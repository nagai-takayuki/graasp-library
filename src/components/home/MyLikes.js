import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CollectionsGrid from '../collection/CollectionsGrid';
import { QueryClientContext } from '../QueryClientContext';
import { PUBLISHED_TAG_ID } from '../../config/env';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';
import TabPanel from './TabPanel';
import { MY_LIKES_COLLECTIONS_ID } from '../../config/selectors';

function MyLikes({ tab, index }) {
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag(
    PUBLISHED_TAG_ID,
    {
      placeholderData: PLACEHOLDER_COLLECTIONS,
    },
  );
  const { data: likedItems } = hooks.useLikedItems(member?.get('id'));
  const likedItemsList = likedItems?.map((entry) => entry.itemId);
  const likedCollections = collections?.filter((collection) =>
    likedItemsList?.includes(collection?.id),
  );

  return (
    <TabPanel value={tab} index={index}>
      <CollectionsGrid
        id={MY_LIKES_COLLECTIONS_ID}
        collections={likedCollections}
        isLoading={isLoading}
      />
    </TabPanel>
  );
}

MyLikes.propTypes = {
  tab: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default MyLikes;
