import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SimilarCollectionBadges from './SimilarCollectionBadges';
import DEFAULT_COLLECTION_IMAGE from '../../resources/icon.png';
import { getAvatar } from '../../utils/layout';
import { buildCollectionRoute } from '../../config/routes';
import { openInNewTab } from '../../config/helpers';
import { CARD_DESCRITPION_MAX_LENGTH } from '../../config/constants';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: 300,
  },
  header: {},
}));

export const CollectionCard = ({ collection = {} }) => {
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

  const handleCollectionClick = () => {
    const spaceUrl = buildCollectionRoute(id);
    openInNewTab(spaceUrl);
  };

  const avatar = (
    <Avatar
      aria-label={author.name}
      src={getAvatar(author.image)}
      title={author.name}
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

  const { thumbnailUrl = DEFAULT_COLLECTION_IMAGE } = image;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={avatar}
        action={action}
        title={name}
        subheader={`${t('a collection by')} ${author.name}`}
      />
      <CardActionArea onClick={handleCollectionClick}>
        <CardMedia
          className={classes.media}
          image={thumbnailUrl}
          title={name}
          component="img"
        />
      </CardActionArea>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <p
            dangerouslySetInnerHTML={{
              __html: _.truncate(description, {
                length: CARD_DESCRITPION_MAX_LENGTH,
                separator: /,? +/,
              }),
            }}
          />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <SimilarCollectionBadges views={views} voteScore={voteScore} />
      </CardActions>
    </Card>
  );
};

CollectionCard.propTypes = {
  collection: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.shape({}),
    }),
    voteScore: PropTypes.number,
    views: PropTypes.number,
  }).isRequired,
};

export default CollectionCard;
