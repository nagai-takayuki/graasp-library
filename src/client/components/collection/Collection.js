import React from 'react';
// todo: make dynamic
// import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Summary from './Summary';
import Items from './Items';
import Comments from './Comments';
// todo: get similar collections in same call
// import SimilarCollections from './SimilarCollections';
import {
  comments,
  contributors,
  creator,
  description,
  image,
  items,
  likes,
  name,
  rating,
  // todo: get similar collections in same call
  // similarCollections,
  views,
} from '../../data/sample';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

function Collection() {
  // todo: make dynamic
  // const { id } = useParams();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Summary
        name={name}
        image={image}
        description={description}
        creator={creator}
        contributors={contributors}
        views={views}
        likes={likes}
        rating={rating}
      />
      <Divider className={classes.divider} />
      <Items items={items} />
      <Divider className={classes.divider} />
      <Comments comments={comments} />
    </div>
  );
}

export default Collection;
