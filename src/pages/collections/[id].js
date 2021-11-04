import { configureQueryClient, Api } from '@graasp/query-client';
import PropTypes from 'prop-types';

import * as React from 'react';
import {
  buildCollectionKey,
  buildMemberKey,
  QUERY_CLIENT_OPTIONS,
} from '../../config/constants';
import Collection from '../../components/collection/Collection';
import Wrapper from '../../components/common/Wrapper';

const CollectionPage = ({ dehydratedState, id }) => (
  <Wrapper dehydratedState={dehydratedState}>
    <Collection id={id} />
  </Wrapper>
);

CollectionPage.propTypes = {
  dehydratedState: PropTypes.shape({}).isRequired,
  id: PropTypes.string.isRequired,
};

// This gets called on every request
export async function getServerSideProps({ params }) {
  const { id } = params;
  const { queryClient, dehydrate } = configureQueryClient(QUERY_CLIENT_OPTIONS);

  // prefetch data in query client
  const collectionKey = buildCollectionKey(id);
  await queryClient.prefetchQuery(collectionKey, () =>
    Api.getItem(id, { withMemberships: true }, QUERY_CLIENT_OPTIONS).then(
      (data) => data,
    ),
  );

  const author = (await queryClient.getQueryData(collectionKey)).creator;

  await queryClient.prefetchQuery(buildMemberKey(author), () =>
    Api.getMember(
      {
        id: author,
      },
      QUERY_CLIENT_OPTIONS,
    )
      .then((data) => data)
      .catch(
        () => ({}), // do not fail on fetch error, set empty member
      ),
  );

  // Pass data to the page via props
  return { props: { id, dehydratedState: dehydrate(queryClient) } };
}

export default CollectionPage;
