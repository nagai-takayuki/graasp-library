import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '../common/CardMediaComponent';
import CopyButton from './CopyButton';
import CopyLinkButton from './CopyLinkButton';
import DownloadButton from './DownloadButton';
import { buildCollectionRoute } from '../../config/routes';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    aspectRatio: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 35,
    boxShadow:
      '0px 2px 4px -1px rgb(0 0 0 / 30%), 0px 4px 5px 0px rgb(0 0 0 / 20%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
  },
  cardDescription: {
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: '20%',
  },
  cardDescriptionText: {
    '& p': {
      fontSize: 'large',
      fontFamily: theme.typography.fontFamily,
    },
  },
  button: {
    minHeight: '80%',
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

export const ChildrenCard = ({ item }) => {
  const { name, id, extra } = item;
  const classes = useStyles();

  const link = buildCollectionRoute(id);

  return (
    <Card id={id} className={classes.card}>
      <CardMedia itemId={id} name={name} link={link} />

      <CardContent>
        <Typography variant="h6" component="h2">
          {name}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <CopyButton id={id} />
        <CopyLinkButton id={id} extra={extra} />
        <DownloadButton id={id} />
      </CardActions>
    </Card>
  );
};

ChildrenCard.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    extra: PropTypes.shape({}),
  }).isRequired,
};

export default ChildrenCard;
