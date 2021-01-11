import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  inline: {
    display: 'inline',
  },
}));

function Comment({ comment }) {
  const {
    text,
    author: { name, avatar },
    date,
  } = comment;
  const classes = useStyles();

  const PrimaryText = (
    <>
      <Typography
        component="span"
        variant="body1"
        className={classes.inline}
        color="textPrimary"
      >
        {name}
      </Typography>
      <Typography
        component="span"
        variant="body2"
        className={classes.inline}
        color="textSecondary"
      >
        {` ${date}`}
      </Typography>
    </>
  );

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Tooltip title={name}>
            <Avatar alt={name} src={avatar} />
          </Tooltip>
        </ListItemAvatar>
        <ListItemText primary={PrimaryText} secondary={text} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    date: PropTypes.string,
  }).isRequired,
};

export default Comment;
