import React from 'react';
import { useParams } from 'react-router-dom';
import ObjectID from 'bson-objectid';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { ErrorBoundary } from '@sentry/react';
import Error from '../common/Error';
import Summary from './Summary';
import Items from './Items';
import Comments from './Comments';
import { DEFAULT_PICTURE_QUALITY, MEMBER_TYPES } from '../../config/constants';
import Seo from '../common/Seo';
import {
  ERROR_INVALID_COLLECTION_ID_CODE,
  ERROR_UNEXPECTED_ERROR_CODE,
} from '../../config/messages';
import ITEM_DEFAULT_IMAGE from '../../resources/icon.png';
import { removeTagsFromString } from '../../utils/text';
import { buildImageUrl } from '../../utils/image';
import { useCollection } from '../../utils/collections';
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
  const { id } = useParams();
  const classes = useStyles();
  const { collection, isLoading, isError } = useCollection(id);

  const {
    comments,
    description,
    image = {},
    subitems: items,
    voteScore: likes,
    name,
    // todo: get similar collections in same call
    // similarCollections,
    views,
    members,
    loadingCollection,
  } = collection;

  if (!id || !ObjectID.isValid(id)) {
    return <Error code={ERROR_INVALID_COLLECTION_ID_CODE} />;
  }

  if (isError) {
    return <Error code={ERROR_UNEXPECTED_ERROR_CODE} />;
  }

  const { pictureId } = image;
  const creator = members.find(({ type }) => type === MEMBER_TYPES.OWNER);
  const contributors = members.filter(({ id: mId }) => mId !== creator.id);
  const imageUrl = loadingCollection
    ? image.thumbnailUrl
    : buildImageUrl({ id, pictureId, quality: DEFAULT_PICTURE_QUALITY }) ||
      ITEM_DEFAULT_IMAGE;

  return (
    <ErrorBoundary>
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
          isLoading={isLoading}
        />
        <Divider className={classes.divider} />
        <Items items={items} />
        <Divider className={classes.divider} />
        <Comments comments={comments} members={members} />
      </div>
    </ErrorBoundary>
  );
}

export default Collection;
