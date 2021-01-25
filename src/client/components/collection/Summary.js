import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Authorship from './Authorship';
import ITEM_DEFAULT_IMAGE from '../../resources/icon.png';
import Badges from './Badges';

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
  media: {
    minHeight: 450,
  },
  root: {
    flexGrow: 1,
  },
}));

function Summary({
  name,
  creator,
  image,
  description,
  contributors,
  likes,
  views,
}) {
  console.log(description);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6} className={classes.centeredGridItem}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={image?.thumbnailUrl || ITEM_DEFAULT_IMAGE}
              title={name}
            />
          </Card>
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography variant="h1" gutterBottom>
            {name}
          </Typography>
          <Badges views={views} likes={likes} />
          <Typography variant="body1" gutterBottom component="p">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Typography>
          <Authorship author={creator} contributors={contributors} />
        </Grid>
      </Grid>
    </div>
  );
}

Summary.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  creator: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
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
};

Summary.defaultProps = {
  name: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  contributors: [],
  views: 0,
  likes: 0,
  rating: {
    count: 0,
    value: 0,
  },
};

export default Summary;
