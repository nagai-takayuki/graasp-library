import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CollectionCard from './CollectionCard';
import {
  buildCollectionCardGridId,
  COLLECTIONS_GRID_ID,
} from '../../config/selectors';

function CollectionsGrid({ collections, isLoading }) {
  const { t } = useTranslation();

  return !collections?.size ? (
    <Typography variant="h5" color="inherit">
      {t('There are no collections available.')}
    </Typography>
  ) : (
    <Grid container spacing={2} alignItems="stretch" id={COLLECTIONS_GRID_ID}>
      {collections.map((collection, index) => (
        <Grid
          key={collection.id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          id={buildCollectionCardGridId(COLLECTIONS_GRID_ID, index)}
        >
          <CollectionCard collection={collection} isLoading={isLoading} />
        </Grid>
      ))}
    </Grid>
  );
}

CollectionsGrid.propTypes = {
  collections: PropTypes.instanceOf(List),
  isLoading: PropTypes.bool.isRequired,
};

CollectionsGrid.defaultProps = {
  collections: [],
};

export default CollectionsGrid;
