import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';
import CardMedia from '../common/CardMediaComponent';
import Authorship from './Authorship';
import Badges from './Badges';
import { MAX_COLLECTION_NAME_LENGTH } from '../../config/constants';

const useStyles = makeStyles((theme) => ({
  centeredGridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    marginRight: theme.spacing(2),
  },
  image: {
    minHeight: '350px !important',
  },
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: '4em',
  },
}));

function Summary({
  itemId,
  name,
  creator,
  description,
  contributors,
  likes,
  views,
  isLoading,
}) {
  const truncatedName = _.truncate(name, {
    length: MAX_COLLECTION_NAME_LENGTH,
    separator: /,? +/,
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item sm={12} md={4} className={classes.centeredGridItem}>
          <Card className={classes.card}>
            {isLoading ? (
              <Skeleton variant="rect" width="100%">
                <CardMedia name={name} className={classes.image} />
              </Skeleton>
            ) : (
              <CardMedia name={name} className={classes.image} />
            )}
          </Card>
        </Grid>
        <Grid item sm={12} md={8}>
          <Typography variant="h1" gutterBottom className={classes.title}>
            {truncatedName}
          </Typography>
          <Badges
            name={name}
            views={views}
            likes={likes}
            description={description}
          />
          <Typography variant="body1" gutterBottom component="div">
            {isLoading ? (
              <Skeleton />
            ) : (
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </Typography>
          <Authorship
            itemId={itemId}
            author={creator}
            contributors={contributors}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </div>
  );
}

Summary.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  creator: PropTypes.instanceOf(Map),
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  ),
  likes: PropTypes.number,
  views: PropTypes.number,
  rating: PropTypes.shape({
    value: PropTypes.number,
    count: PropTypes.number,
  }),
  isLoading: PropTypes.bool.isRequired,
  itemId: PropTypes.string.isRequired,
};

Summary.defaultProps = {
  name: PropTypes.string,
  description: PropTypes.string,
  contributors: [],
  views: 0,
  likes: 0,
  rating: {
    count: 0,
    value: 0,
  },
  creator: null,
};

export default Summary;
