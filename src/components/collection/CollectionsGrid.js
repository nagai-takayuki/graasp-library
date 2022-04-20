import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CollectionCard from './CollectionCard';
import { buildCollectionCardGridId } from '../../config/selectors';

function CollectionsGrid({ collections, isLoading, id, sm, md, lg, xl }) {
  const { t } = useTranslation();

  return !collections?.size ? (
    <Typography variant="h5" color="inherit">
      {t('There are no collections available.')}
    </Typography>
  ) : (
    <Grid
      container
      spacing={4}
      alignItems="center"
      justifyContent="flex-start"
      id={id}
    >
      {collections?.map((collection, index) => (
        <Grid
          key={collection?.id}
          item
          xs={12}
          sm={sm}
          md={md}
          lg={lg}
          xl={xl}
          id={buildCollectionCardGridId(id, index)}
        >
          <CollectionCard collection={collection} isLoading={isLoading} />
        </Grid>
      ))}
    </Grid>
  );
}

CollectionsGrid.propTypes = {
  id: PropTypes.string,
  collections: PropTypes.instanceOf(List),
  isLoading: PropTypes.bool.isRequired,
  sm: PropTypes.instanceOf(Number),
  md: PropTypes.instanceOf(Number),
  lg: PropTypes.instanceOf(Number),
  xl: PropTypes.instanceOf(Number),
};

CollectionsGrid.defaultProps = {
  id: '',
  collections: [],
  sm: 6,
  md: 4,
  lg: 3,
  xl: 3,
};

export default CollectionsGrid;
