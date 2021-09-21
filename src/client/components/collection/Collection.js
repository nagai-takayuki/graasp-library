import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { validate } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { ErrorBoundary } from '@sentry/react';
import Error from '../common/Error';
import Summary from './Summary';
import Items from './Items';
import Seo from '../common/Seo';
import {
  ERROR_INVALID_COLLECTION_ID_CODE,
  ERROR_UNEXPECTED_ERROR_CODE,
} from '../../config/messages';
import ITEM_DEFAULT_IMAGE from '../../resources/icon.png';
import { removeTagsFromString } from '../../utils/text';
import { QueryClientContext } from '../QueryClientContext';
import { PLACEHOLDER_COLLECTION } from '../../utils/collections';

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

const Collection = () => {
  const { id } = useParams();
  const classes = useStyles();
  const { hooks } = useContext(QueryClientContext);
  const { data: collection, isLoading: isLoadingItem, isError } = hooks.useItem(
    id,
    {
      placeholderData: PLACEHOLDER_COLLECTION,
      withMemberships: true,
    },
  );
  const {
    data: member,
    isError: memberIsError,
    isLoading: isLoadingMember,
  } = hooks.useMember(collection?.get('creator'));

  if (!id || !validate(id)) {
    return <Error code={ERROR_INVALID_COLLECTION_ID_CODE} />;
  }

  if (isError || memberIsError) {
    return <Error code={ERROR_UNEXPECTED_ERROR_CODE} />;
  }

  const isLoading = isLoadingItem || isLoadingMember;

  const name = collection?.get('name');
  // todo: handle image
  // const { pictureId } = collection.get('image');
  // const imageUrl = collection.get('loadingCollection')
  //   ? collection.get('image').thumbnailUrl
  //   : buildImageUrl({ id, pictureId, quality: DEFAULT_PICTURE_QUALITY }) ||
  //     ITEM_DEFAULT_IMAGE;
  const imageUrl = ITEM_DEFAULT_IMAGE;

  const parsedDescription = removeTagsFromString(
    collection?.get('description'),
  );

  // todo: views and likes don't exist
  const views = collection?.get('views');
  const likes = collection?.get('likes');
  return (
    <ErrorBoundary>
      <Seo
        title={name}
        description={parsedDescription}
        author={member?.get('name')}
        image={imageUrl}
      />
      <div id={id} className={classes.root}>
        <Summary
          itemId={id}
          name={name}
          image={imageUrl}
          description={parsedDescription}
          creator={member}
          views={views}
          likes={likes}
          isLoading={isLoading}
        />
        <Divider className={classes.divider} />
        <Items parentId={id} />
        <Divider className={classes.divider} />
        {/* <Comments comments={comments} members={members} /> */}
      </div>
    </ErrorBoundary>
  );
};

export default Collection;
