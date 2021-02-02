import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CollectionCard from './CollectionCard';

function CollectionsGrid({ collections }) {
  const { t } = useTranslation();

  return !collections.length ? (
    <Typography variant="h5" color="inherit">
      {t('There are no collections available.')}
    </Typography>
  ) : (
    <Grid container spacing={2}>
      {collections.map((similarCollection) => (
        <Grid
          key={similarCollection.id}
          item
          xs={12}
          sm={4}
          md={3}
          lg={3}
          xl={2}
        >
          <CollectionCard collection={similarCollection} />
        </Grid>
      ))}
    </Grid>
  );
}

CollectionsGrid.propTypes = {
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string,
      creator: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string,
      }),
      likes: PropTypes.number,
      views: PropTypes.number,
      rating: PropTypes.shape({
        value: PropTypes.number,
        count: PropTypes.number,
      }),
    }),
  ),
};

CollectionsGrid.defaultProps = {
  collections: [],
};

export default CollectionsGrid;
