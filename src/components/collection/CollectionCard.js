import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { toast } from 'react-toastify';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Skeleton from '@material-ui/lab/Skeleton';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SimilarCollectionBadges from './SimilarCollectionBadges';
import { buildCollectionRoute } from '../../config/routes';
import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';
import CopyButton from './CopyButton';
import CardMedia from '../common/CardMediaComponent';
import CopyLinkButton from './CopyLinkButton';
import DownloadButton from './DownloadButton';

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 400,
    height: '100%',
    display: 'flex',
    aspectRatio: 1,
    flexDirection: 'column',
    borderRadius: 35,
    boxShadow:
      '0px 2px 4px -1px rgb(0 0 0 / 30%), 0px 4px 5px 0px rgb(0 0 0 / 20%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
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
  const { name, id, creator, views, voteScore, extra } = collection;
  const classes = useStyles();
  const [actionsMenuAnchor, setActionsMenuAnchor] = React.useState(null);
  const { hooks } = useContext(QueryClientContext);
  const { data: author } = hooks.useMember(creator);
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

  const avatar = isLoading ? (
    <Skeleton>
      <Avatar />
    </Skeleton>
  ) : (
    <Avatar
      useAvatar={hooks.useAvatar}
      alt={author?.get('name')}
      className={classes.avatar}
      defaultImage={DEFAULT_MEMBER_THUMBNAIL}
      id={creator}
      extra={author?.get('extra')}
      component="avatar"
      maxWidth={30}
      maxHeight={30}
      variant="circle"
    />
  );

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

  const link = buildCollectionRoute(id);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={avatar}
        action={action}
        title={name}
        subheader={author?.get('name')}
        titleTypographyProps={{ title: name }}
        classes={{
          root: classes.header,
          title: classes.title,
          subheader: classes.subheader,
          content: classes.content,
        }}
      />
      <CardMedia link={link} name={name} itemId={id} />
      <CardActions disableSpacing className={classes.actions}>
        <CopyButton id={id} />
        <CopyLinkButton id={id} extra={extra} />
        <DownloadButton id={id} />
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
  isLoading: PropTypes.bool.isRequired,
};

export default CollectionCard;
