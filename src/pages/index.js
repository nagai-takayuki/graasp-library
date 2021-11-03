import * as React from 'react';
import { configureQueryClient, Api } from '@graasp/query-client';
import PropTypes from 'prop-types';
import { PUBLISHED_ITEMS_KEY, QUERY_CLIENT_OPTIONS } from '../config/constants';
import Home from '../components/home/Home';
import Wrapper from '../components/common/Wrapper';

function HomePage({ dehydratedState }) {
  return (
    <Wrapper dehydratedState={dehydratedState}>
      <Home />
    </Wrapper>
  );
}

HomePage.propTypes = {
  dehydratedState: PropTypes.shape({}).isRequired,
};

// This gets called on every request
export async function getServerSideProps() {
  const { queryClient, dehydrate } = configureQueryClient(QUERY_CLIENT_OPTIONS);

  await queryClient.prefetchQuery(PUBLISHED_ITEMS_KEY, () =>
    Api.getPublicItemsWithTag(
      {
        tagId: process.env.NEXT_PUBLIC_PUBLISHED_TAG_ID,
        withMemberships: true,
      },
      QUERY_CLIENT_OPTIONS,
    ).then((data) => data),
  );

  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default HomePage;
