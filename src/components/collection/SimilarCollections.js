import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SimilarCollection from './SimilarCollection';
import SimilarCollectionsHeader from './SimilarCollectionsHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function SimilarCollections({ similarCollections }) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SimilarCollectionsHeader />
      {!similarCollections.length ? (
        <div className="Main">
          <Typography variant="h5" color="inherit">
            {t('There are no similar collections available.')}
          </Typography>
        </div>
      ) : (
        <Grid container spacing={2}>
          {similarCollections.map((similarCollection) => (
            <Grid
              key={similarCollection.id}
              item
              xs={12}
              sm={4}
              md={3}
              lg={3}
              xl={2}
            >
              <SimilarCollection similarCollection={similarCollection} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

SimilarCollections.propTypes = {
  similarCollections: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      description: PropTypes.string,
      viewLink: PropTypes.func,
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
};

SimilarCollections.defaultProps = {
  similarCollections: [],
};

export default SimilarCollections;
