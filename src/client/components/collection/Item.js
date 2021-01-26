import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Text from '../common/Text';
import ITEM_DEFAULT_IMAGE from '../../resources/icon.png';
import { ITEM_TYPES } from '../../config/constants';
import { openContentInNewTab, openInNewTab } from '../../config/helpers';
import { buildSpaceRoute } from '../../config/routes';
import CopyButton from './CopyButton';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
  },
  cardDescription: { margin: 0, paddingTop: 0, paddingBottom: 0 },
  cardDescriptionText: {
    '& p': {
      fontSize: 'large',
      fontFamily: theme.typography.fontFamily,
    },
  },
  media: {
    height: 300,
  },
  leftIcon: {
    marginRight: theme.spacing(),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export const Item = ({ item }) => {
  const { description, name, url, content, id, image, category } = item;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleItemClick = () => {
    switch (category) {
      case ITEM_TYPES.SPACE: {
        const spaceUrl = buildSpaceRoute(id);
        openInNewTab(spaceUrl);
        break;
      }
      case ITEM_TYPES.APPLICATION:
      case ITEM_TYPES.RESOURCE:
      default:
        if (url) {
          openInNewTab(url);
        } else if (content) {
          openContentInNewTab(content);
        }
    }
  };

  const imageUrl = image?.thumbnailUrl || ITEM_DEFAULT_IMAGE;

  return (
    <Card id={id} className={classes.card}>
      <CardActionArea onClick={handleItemClick}>
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title={name}
          component="img"
        />

        <CardContent>
          <Typography variant="h5" component="h2" noWrap>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Collapse disableSpacing in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.cardDescription}>
          <Text content={description} className={classes.cardDescriptionText} />
        </CardContent>
      </Collapse>

      <CardActions disableSpacing>
        <CopyButton id={id} />
        {description && (
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.shape({
      thumbnailUrl: PropTypes.string,
    }),
    description: PropTypes.string,
    viewLink: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.oneOf(Object.values(ITEM_TYPES)).isRequired,
    type: PropTypes.string,
  }).isRequired,
};

export default Item;
