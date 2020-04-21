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

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
  },
  cardDescription: { margin: 0, paddingTop: 0, paddingBottom: 0 },
  cardDescriptionText: {
    '& p': {
      fontSize: 'large',
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
  const { image, description, viewLink, name } = item;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={viewLink}>
        <CardMedia className={classes.media} image={image} title={name} />

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
  classes: PropTypes.shape({
    media: PropTypes.string.isRequired,
    card: PropTypes.string.isRequired,
    cardDescription: PropTypes.string.isRequired,
    cardDescriptionText: PropTypes.string.isRequired,
    expand: PropTypes.string.isRequired,
    expandOpen: PropTypes.string.isRequired,
  }).isRequired,
  space: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  item: PropTypes.shape({
    image: PropTypes.string,
    description: PropTypes.string,
    viewLink: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default Item;
