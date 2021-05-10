import React from 'react';
import { useParams } from 'react-router-dom';
import ObjectID from 'bson-objectid';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Divider } from '@material-ui/core';
import Error from '../common/Error';
import Summary from './Summary';
import Items from './Items';
import Comments from './Comments';
import { DEFAULT_PICTURE_QUALITY, MEMBER_TYPES } from '../../config/constants';
import Seo from '../common/Seo';
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

  const { collection, isLoading } = useCollection(id);

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
    return <Error />;
  }

  const { pictureId } = image;
  const creator = members.find(({ type }) => type === MEMBER_TYPES.OWNER);
  const contributors = members.filter(({ id: mId }) => mId !== creator.id);
  const imageUrl = loadingCollection
    ? image.thumbnailUrl
    : buildImageUrl({ id, pictureId, quality: DEFAULT_PICTURE_QUALITY }) ||
      ITEM_DEFAULT_IMAGE;

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
          isLoading={isLoading}
        />
        <Divider className={classes.divider} />
        <Items items={items} />
        <Divider className={classes.divider} />
        <Comments comments={comments} members={members} />
      </div>
    </>
  );
}

export default Collection;
