import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SimilarCollectionBadges from './SimilarCollectionBadges';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    paddingTop: '56.25%', // 16:9
  },
}));

export const SimilarCollection = ({ similarCollection }) => {
  const { t } = useTranslation();
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
  const [actionsMenuAnchor, setActionsMenuAnchor] = React.useState(null);
  const handleClick = (event) => {
    setActionsMenuAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setActionsMenuAnchor(null);
  };

  const avatar = (
    <Avatar
      aria-label={creator.name}
      src={creator.avatar}
      title={creator.name}
    />
  );

  const action = (
    <IconButton aria-label="actions">
      <MoreVertIcon onClick={handleClick} />
      <Menu
        id="actions-menu"
        anchorEl={actionsMenuAnchor}
        keepMounted
        open={Boolean(actionsMenuAnchor)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>{t('Save Collection')}</MenuItem>
        <MenuItem onClick={handleClose}>{t('Copy Link')}</MenuItem>
      </Menu>
    </IconButton>
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={avatar}
        action={action}
        title={name}
        subheader={`${t('a collection by')} ${creator.name}`}
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
  similarCollection: PropTypes.shape({
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
  }).isRequired,
};

export default SimilarCollection;
