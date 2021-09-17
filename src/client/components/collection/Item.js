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
import { openInNewTab } from '../../config/helpers';
import { buildPerformViewItemRoute } from '../../config/routes';
import CopyButton from './CopyButton';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  const { description, name, id, type } = item;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleItemClick = () => {
    openInNewTab(buildPerformViewItemRoute(id));
  };

  const imageUrl = ITEM_DEFAULT_IMAGE;

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
          <Typography variant="h6" component="h2">
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
        {type === ITEM_TYPES.FOLDER && <CopyButton id={id} />}
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
    description: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    extra: PropTypes.shape({}),
  }).isRequired,
};

export default Item;
