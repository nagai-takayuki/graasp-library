import React from 'react';
import PropTypes from 'prop-types';
import { Set } from 'immutable';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CollectionCard from './CollectionCard';

function CollectionsGrid({ collections, isLoading }) {
  const { t } = useTranslation();

  return !collections.size ? (
    <Typography variant="h5" color="inherit">
      {t('There are no collections available.')}
    </Typography>
  ) : (
    <Grid container spacing={2} alignItems="stretch">
      {collections.map((collection) => (
        <Grid key={collection.id} item xs={12} sm={6} md={4} lg={3} xl={3}>
          <CollectionCard collection={collection} isLoading={isLoading} />
        </Grid>
      ))}
    </Grid>
  );
}

CollectionsGrid.propTypes = {
  collections: PropTypes.instanceOf(Set),
  isLoading: PropTypes.bool.isRequired,
};

CollectionsGrid.defaultProps = {
  collections: [],
};

export default CollectionsGrid;
