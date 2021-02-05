import React, { useContext } from 'react';
// todo: make dynamic
// import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Summary from './Summary';
import Items from './Items';
import Comments from './Comments';
import { CollectionContext } from '../CollectionProvider';
import { MEMBER_TYPES } from '../../config/constants';
import Seo from '../common/Seo';
import ITEM_DEFAULT_IMAGE from '../../resources/icon.png';
import { removeTagsFromString } from '../../utils/text';
// todo: get similar collections in same call
// import SimilarCollections from './SimilarCollections';

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

  const {
    current: {
      id,
      comments,
      description,
      image,
      subitems: items,
      voteScore: likes,
      name,
      // todo: get similar collections in same call
      // similarCollections,
      views,
      members,
    },
  } = useContext(CollectionContext);

  const creator = members.find(({ type }) => type === MEMBER_TYPES.OWNER);
  const contributors = members.filter(({ id: mId }) => mId !== creator.id);
  const imageUrl = image?.thumbnailUrl || ITEM_DEFAULT_IMAGE;

  const classes = useStyles();

  return (
    <>
      <Seo
        title={name}
        description={removeTagsFromString(description)}
        author={creator.name}
        image={imageUrl}
      />
      <div id={id} className={classes.root}>
        <Summary
          name={name}
          image={imageUrl}
          description={description}
          creator={creator}
          contributors={contributors}
          views={views}
          likes={likes}
        />
        <Divider className={classes.divider} />
        <Items items={items} />
        <Divider className={classes.divider} />
        <Comments comments={comments} />
      </div>
    </>
  );
}

export default Collection;
