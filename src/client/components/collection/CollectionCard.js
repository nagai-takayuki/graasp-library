import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { toast } from 'react-toastify';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Skeleton } from '@material-ui/lab';
import SimilarCollectionBadges from './SimilarCollectionBadges';
import DEFAULT_COLLECTION_IMAGE from '../../resources/icon.png';
import { getAvatar } from '../../utils/layout';
import { buildCollectionRoute } from '../../config/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 300,
  },
  header: {
    height: 60,
    position: 'relative',
  },
  content: {
    width: '65%',
  },
  title: {
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    display: '-webkit-box',
    // number of lines to show
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
  },
  actions: {
    marginTop: 'auto',
  },
  subheader: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  description: {
    margin: theme.spacing(1, 0),
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    display: '-webkit-box',
    // number of lines to show
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    '& p': {
      margin: theme.spacing(0),
    },
    // hide long descriptions splitted in multiple paragraphs
    '& p:nth-child(1n+2)': {
      display: 'none',
    },
  },
}));

export const CollectionCard = ({ collection = {}, isLoading }) => {
  const { t } = useTranslation();
  const {
    name,
    id,
    image = {},
    description,
    author = {},
    views,
    voteScore,
  } = collection;
  const classes = useStyles();
  const [actionsMenuAnchor, setActionsMenuAnchor] = React.useState(null);
  const handleClick = (event) => {
    setActionsMenuAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setActionsMenuAnchor(null);
  };

  const handleCopyLink = () => {
    // copy collection url to clipboard
    const collectionUrl = `${window.location.hostname}${buildCollectionRoute(
      id,
    )}`;
    navigator.clipboard.writeText(collectionUrl);
    handleClose();
    toast.success(t('Collection link is copied to your clipboard.'));
  };

  const avatar = () => {
    if (isLoading) {
      return (
        <Skeleton>
          <Avatar />
        </Skeleton>
      );
    }
    return (
      <Avatar
        aria-label={author.name}
        src={getAvatar(author.image)}
        title={author.name}
      />
    );
  };

  const action = (
    <>
      <IconButton aria-label="actions" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="actions-menu"
        anchorEl={actionsMenuAnchor}
        keepMounted
        open={Boolean(actionsMenuAnchor)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleCopyLink}>{t('Copy Link')}</MenuItem>
      </Menu>
    </>
  );

  const { thumbnailUrl = DEFAULT_COLLECTION_IMAGE } = image;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={avatar}
        action={action}
        title={name}
        subheader={author.name}
        titleTypographyProps={{ title: name }}
        classes={{
          root: classes.header,
          title: classes.title,
          subheader: classes.subheader,
          content: classes.content,
        }}
      />
      <Link to={buildCollectionRoute(id)}>
        {isLoading ? (
          <Skeleton>
            <CardMedia
              className={classes.media}
              image={thumbnailUrl}
              title={name}
              component="img"
            />
          </Skeleton>
        ) : (
          <CardMedia
            className={classes.media}
            image={thumbnailUrl}
            title={name}
            component="img"
          />
        )}
      </Link>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <p
            className={classes.description}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.actions}>
        <SimilarCollectionBadges views={views} voteScore={voteScore} />
      </CardActions>
    </Card>
  );
};

CollectionCard.propTypes = {
  collection: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    image: PropTypes.shape({
      pictureId: PropTypes.string.isRequired,
      thumbnailUrl: PropTypes.string,
    }),
    description: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.shape({
        gravatarUrl: PropTypes.string,
        thumbnailUrl: PropTypes.string,
      }),
    }),
    voteScore: PropTypes.number,
    views: PropTypes.number,
  }).isRequired,
};

export default CollectionCard;
