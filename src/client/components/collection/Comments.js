import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import CommentsHeader from './CommentsHeader';
import Comment from './Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

function Comments({ comments }) {
  const classes = useStyles();

  if (!comments || !comments.length) {
    return null;
  }

  return (
    <>
      <CommentsHeader />
      <Grid container>
        <Grid item xs={12}>
          <List className={classes.root}>
            {comments.map((comment) => {
              const { published } = comment;
              return <Comment key={published} comment={comment} />;
            })}
          </List>
        </Grid>
      </Grid>
    </>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      author: PropTypes.string.isRequired,
      date: PropTypes.string,
    }),
  ),
};

Comments.defaultProps = {
  comments: [],
};

export default Comments;
