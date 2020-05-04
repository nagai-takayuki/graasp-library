import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SimilarCollectionBadges from './SimilarCollectionBadges';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export const SimilarCollection = ({ similarCollection }) => {
  const {
    name,
    image,
    description,
    creator,
    views,
    likes,
    rating,
  } = similarCollection;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label={creator.name}
            src={creator.avatar}
            title={creator.name}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={`a collection by ${creator.name}`}
      />
      <CardMedia className={classes.media} image={image} title={name} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <SimilarCollectionBadges views={views} likes={likes} rating={rating} />
      </CardActions>
    </Card>
  );
};

SimilarCollection.propTypes = {
  classes: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
    media: PropTypes.string.isRequired,
  }).isRequired,
  space: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  similarCollection: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    creator: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    views: PropTypes.number,
    likes: PropTypes.number,
    rating: PropTypes.shape({
      value: PropTypes.number,
      count: PropTypes.number,
    }),
  }).isRequired,
};

export default SimilarCollection;
