import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CollectionsGrid from '../collection/CollectionsGrid';
import { QueryClientContext } from '../QueryClientContext';
import { PUBLISHED_TAG_ID } from '../../config/env';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';
import TabPanel from './TabPanel';

function MyPublishments({ tab, index }) {
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag(
    PUBLISHED_TAG_ID,
    {
      placeholderData: PLACEHOLDER_COLLECTIONS,
    },
  );
  const ownCollections = collections?.filter(
    (collection) => collection?.creator === member?.get('id'),
  );

  return (
    <TabPanel value={tab} index={index}>
      <CollectionsGrid collections={ownCollections} isLoading={isLoading} />
    </TabPanel>
  );
}

MyPublishments.propTypes = {
  tab: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default MyPublishments;
